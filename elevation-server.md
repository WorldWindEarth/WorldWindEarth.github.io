# How to Setup an Elevation Server

## Introduction  

This guide shows how to create a WMS server using Apache, [MapServer](https://mapserver.org/documentation.html) and GDAL to serve elevations to WorldWind clients. 
WorldWind clients consume elevation data from a WMS service in an `application/bil16` mime-type via OGC WMS requests.

WorldWind Java clients obtain the elevation data via a compound GetMap request with multiple layers of different resoluions and extents, for example:

```
GET https://worldwind26.arc.nasa.gov/elev?service=WMS&request=GetMap&version=1.3.0&layers=NASA_SRTM30_900m_Tiled,aster_v2,USGS-NED&format=application/bil16&width=512&height=512&styles=&crs=EPSG:4326&bbox=-20,-20,-10,-10
```

Whereas, Web WorldWind clients obtain the elevation data via distinct GetMap requests and then componsites the different layer resolutions into its terrain model. For example:

```
GET https://worldwind26.arc.nasa.gov/elev?service=WMS&request=GetMap&version=1.3.0&transparent=TRUE&layers=GEBCO&styles=&format=application/bil16&width=256&height=256&crs=EPSG:4326&bbox=33.75,-119.53125,35.15625,-118.125
GET https://worldwind26.arc.nasa.gov/elev?service=WMS&request=GetMap&version=1.3.0&transparent=TRUE&layers=aster_v2&styles=&format=application/bil16&width=256&height=256&crs=EPSG:4326&bbox=33.75,-119.53125,34.453125,-118.828125
GET https://worldwind26.arc.nasa.gov/elev?service=WMS&request=GetMap&version=1.3.0&transparent=TRUE&layers=USGS-NED&styles=&format=application/bil16&width=256&height=256&crs=EPSG:4326&bbox=33.75,-119.1796875,34.1015625,-118.828125
```

## Step 1: Prepare your data

### Install GDAL
We will use GDAL to prepare your data for MapServer. GDAL is also used by MapServer itself also to serve the elevations as `application/bil16` files:

First, update the your package management indexes:
```shell
sudo apt-get update
```
Then, install the GDAL package (gdal-bin):
```shell
sudo apt-get install gdal-bin
```
### Cloud-optimize your data for MapServer
For your MapServer instance to perform well, you need to optimize your data. The data is optimized by tiling, adding overviews, adding a spatial index, and compressing.

Consider the following script used to tile and compress SRTM imagery and then add overviews. `gdal_translate` is used to convert the input file to a tiled and compressed GeoTiff using the lossless LZW compression. Subsequently, `gdaladdo` is used to add overviews to the GeoTiff.

```shell
#!/bin/bash
set +x

# Convert SRTM DEMs to GTIF files with LZW PREDICTOR 2 compression

input_path='/elevations/srtm-cgiar/gtif'
output_path='/elevations/srtm-cgiar/optimized'

mkdir -p $output_path

for file in ${input_path}/*.tif; do
	input_file=${file}
	base_file=`basename ${file}`
        output_file=${output_path}/${base_file}
	if [ -s $output_file ]
	then
		echo Skipping $output_file
		continue
	fi

	echo Converting $input_file to $output_file
	gdal_translate -of GTiff -co TILED=YES -co BLOCKXSIZE=512 -co BLOCKYSIZE=512 -co COMPRESS=LZW -co PREDICTOR=2 $input_file $output_file

	# build the overviews
	if [ -s $output_file ]
	then
		echo Adding overviews to $output_file
		gdaladdo -r cubic --config COMPRESS_OVERVIEW LZW --config PREDICTOR_OVERVIEW 2  --config INTERLEAVE_OVERVIEW PIXEL $output_file 2 4 8 16 32 64 128
	fi
done
echo All Done!
```

Later, in the MapServer configuration, we will create tile index shapefiles with `gdaltindex` and `shptree`.


- See: [Render images straight out of S3 with the vsicurl driver](https://github.com/mapserver/mapserver/wiki/Render-images-straight-out-of-S3-with-the-vsicurl-driver)
- See: [Utilizing Cloud Optimized GeoTIFF - Developers Guide](http://www.cogeo.org/developers-guide.html)
- See: [Cloud Optimized GeoTIFF](https://trac.osgeo.org/gdal/wiki/CloudOptimizedGeoTIFF#HowtogenerateitwithGDAL)

### Reference
- See: [gdal_translate](https://www.gdal.org/gdal_translate.html)
- See: [gdaladdo](https://www.gdal.org/gdaladdo.html)
- See: [gdalinfo](https://www.gdal.org/gdalinfo.html)
- See: [gdaltindex](https://www.gdal.org/gdaltindex.html)

## Step 2: Setup Apache
The ubiquitous Apache web server is used to serve elevations via a MapServer CGI integration.

Install the Apache web server package (apache2):
```shell
sudo apt-get install apache2
```
_Subsequently, adjust your firewall accordingly to allow access to ports 80 and 443._

You can test the Apache configuration with `apachectl`.  It should return _Syntax OK_.
```shell
sudo apachectl configtest
```

Check the status of your Apache configuration:
```shell
sudo systemctl status apache2
```

Start (or restart) Apache if necessary:
```shell
sudo systemctl start apache2
```
```shell
sudo systemctl restart apache2
```

Finally, test Apache by entering your server's IP address (or domain name) into your browser's address bar:
```shell
http://server_ip_address_or_domain
```
You should see a default Apache web page.


## Step 3: Setup MapServer
The MapServer CGI is integrated with Apache via the package install.

### Install MapServer
Type the following to install the MapServer packages for Apache:
```shell
sudo apt-get install cgi-mapserver mapserver-bin
```

### Configure Apache to run MapServer CGI
Now we will configure Apache to run MapServer on the `/elev` endpoint. 
Add the following content to your Apache configuration file (e.g., `/etc/apache2/sites-enabled/000-default.conf`).  
Note that the MS_MAPFILE env variable below refers to an `elev.map` file at `/opt/mapserver/map/`.  We will create that
file later.
```
	Alias /elev /usr/lib/cgi-bin/mapserv
	<Location /elev>
		SetHandler cgi-script
		Options ExecCGI
		SetEnv MS_MAPFILE /opt/mapserver/map/elev.map
	</Location>
```

### Configure MapServer to serve elevations
We will create a number files in our MapServer configuration. First we must create the folders for these files.
Input the following `mkdir` commands to create the folders used by our MapServer instance:
```shell
sudo mkdir -p /opt/mapserver/map
sudo mkdir -p /opt/mapserver/data
sudo mkdir -p /opt/mapserver/tmp
sudo mkdir -p /opt/mapserver/templates
```

Now, ensure the MapServer `tmp` folder can be written to by Apache by inputing the following `chown` command:
```shell
sudo chown www-data:www-data /opt/mapserver/tmp/
```

Create the `elev.map` file and open it for editing:
```shell
sudo touch /opt/mapserver/map/elev.map
sudo nano /opt/mapserver/map/elev.map
```
Use the following content for GEBCO and SRTM as a template. You can add mulitiple `LAYER` entries. Note the `SHAPEPATH` and `TILEINDEX` entries: here we are referencing the tile index shapefiles (to be created) that point to the location of the actual elevation data GeoTiffs. 

```
MAP
  NAME ""  # Short name prepended to map, legend and scalebar filenames 
  STATUS ON
  SIZE 800 600
  EXTENT -180 -90 180 90
  UNITS DD
  SHAPEPATH "../data"   	# Path to folder holding the tile index shapefiles
  IMAGECOLOR 255 255 255    # Background color for transparency

  CONFIG "MS_ERRORFILE" "../tmp/ms_error.txt"
  DEBUG 0                   # 0-5: 0=Off, 1-5=level of detail written to ms_error.txt

  WEB
    IMAGEPATH "/opt/mapserver/tmp/" # Path for temp files; must be writable by www-data
    IMAGEURL "/ms_tmp/"             # Base URL for IMAGEPATH. 
    METADATA
      "ows_title"           "Elevation Server"
      "ows_abstract"        "WorldWind WMS Elevation Service"
      "ows_onlineresource"  "https://<YOUR IP ADDRESS or SERVERNAME>/elev"
      "ows_enable_request"  "*"
      "ows_srs"             "EPSG:4326 EPSG:4269 EPSG:3857"
      "ows_updatesequence"  "2015-02-27T16:26:00Z"
      "wms_contactperson"   "<YOUR NAME>"
      "wms_contactorganization" "<YOUR ORG>"
      "wms_contactPosition" " "
      "wms_contactelectronicmailaddress" "<YOUR EMAIL>"
    END
    TEMPLATE "../templates/blank.html"

  END

  #define your output projection
  PROJECTION
    "init=epsg:4326"
  END

  #define output formats
  OUTPUTFORMAT
    NAME "png"
    DRIVER AGG/PNG
    MIMETYPE "image/png"
    IMAGEMODE RGB
    EXTENSION "png"
    FORMATOPTION "GAMMA=0.75"
  END

  OUTPUTFORMAT
    NAME "bil"
    DRIVER "GDAL/EHdr"
    MIMETYPE "application/bil16"
    IMAGEMODE INT16
    EXTENSION "bil"
  END

  OUTPUTFORMAT
    NAME GEOTIFF_16
    DRIVER "GDAL/GTiff"
    MIMETYPE "image/tiff"
    IMAGEMODE INT16
    EXTENSION "tif"
  END

  #
  # Start of layer definitions
  #
  
  LAYER
    PROCESSING "RESAMPLE=BILINEAR"
    NAME "GEBCO"
    METADATA
      "wms_title"       "GEBCO"
      "wms_abstract"    "General Bathymetric Chart of the Oceans"
      "wms_keywordlist" "LastUpdate= 2015-02-27T12:00:00Z"
    END
    TYPE RASTER
    STATUS ON 
    TILEINDEX "gebco/gebco-index.shp" # Path is relative to SHAPEPATH
    TILEITEM "Location"
    TYPE RASTER
    #MAXSCALEDENOM 500000
    PROJECTION
      "init=epsg:4326"
    END
  END  
  
  LAYER
    PROCESSING "RESAMPLE=BILINEAR"
    NAME "srtm-cgiar"
    METADATA
      "wms_title"       "SRTM-CGIAR"
      "wms_abstract"    "SRTM v4.1 from CGIAR-CSI"
      "wms_keywordlist" "LastUpdate= 2013-07-02T16:26:00Z"
    END
    TYPE RASTER
    STATUS ON 
    TILEINDEX "srtm/srtm-cgiar-index.shp"
    TILEITEM "Location"
    TYPE RASTER
    #MAXSCALEDENOM 500000
    PROJECTION
      "init=epsg:4326"
    END
  END

MAP
```

### Configure the layer's tile index
You must establish a tile index shapefile for each of your layers. Place the tile indexes within the MapServer's `data` folder instead of where the layer data is stored so that the data remains portable and shareable. If the data ever is moved, just delete the tile indexes and regenerate them for each MapServer instance using the data.

For example, for the GEBCO layer, prepare a folder for the tile index:
```shell
sudo mkdir -p /opt/mapserver/data/gebco
```
Now build the tile index with `gdaltindex` and then create a spatial index with `shptree`. In fhe following example, replace the `/elevations/gebco/optimized/*.tif` path with the actual path to your data. If you are recreating the index, remove the old index first  otherwise `gdaltindex` will append to the existing index.
```shell
cd /opt/mapserver/data/gebco
sudo rm gebco-index.*

sudo gdaltindex gebco-index.shp /elevations/gebco/optimized/*.tif
sudo shptree gebco-index.shp
```
Validate the contents of the GEBCO tile index with `ogrinfo`:
```shell
ogrinfo -al -fields=yes gebco-index.shp
```

Repeat this process for each of your layers. Ensure the `TILEINDEX` entry has the correct path to your layer's tile index shapefile. The path can be absolute, relative to the `.map` file, or relative to the `SHAPEPATH` entry.

### Test the configurations

#### WMS GetCapabilties Test
Generate a WMS GetCapabilities request by entering the following http or https URL in your browser, using your server's ip address or domain:
```
http://server_ip_address_or_domain/elev?service=WMS&request=GetCapabilities
```

You should get an XML document similar to the elided example below. Examine the `<Capability/>` section for the existance of `<Layer/>` entries for all the layers that you defined in the configuration.

```xml
<WMS_Capabilities xmlns="http://www.opengis.net/wms" xmlns:sld="http://www.opengis.net/sld" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ms="http://mapserver.gis.umn.edu/mapserver" version="1.3.0" updateSequence="2015-02-27T16:26:00Z" xsi:schemaLocation="http://www.opengis.net/wms http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/sld_capabilities.xsd http://mapserver.gis.umn.edu/mapserver https://worldwind26.arc.nasa.gov/elev?service=WMS&version=1.3.0&request=GetSchemaExtension">
 <!--
 MapServer version 7.0.0 OUTPUT=PNG OUTPUT=JPEG OUTPUT=KML SUPPORTS=PROJ SUPPORTS=AGG SUPPORTS=FREETYPE SUPPORTS=CAIRO SUPPORTS=SVG_SYMBOLS SUPPORTS=RSVG SUPPORTS=ICONV SUPPORTS=FRIBIDI SUPPORTS=WMS_SERVER SUPPORTS=WMS_CLIENT SUPPORTS=WFS_SERVER SUPPORTS=WFS_CLIENT SUPPORTS=WCS_SERVER SUPPORTS=SOS_SERVER SUPPORTS=FASTCGI SUPPORTS=THREADS SUPPORTS=GEOS INPUT=JPEG INPUT=POSTGIS INPUT=OGR INPUT=GDAL INPUT=SHAPEFILE 
-->
	<Service>
		<Name>WMS</Name>
		<Title>Elevation Server</Title>
		<Abstract>WorldWind WMS Elevation Service</Abstract>
		<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://worldwind26.arc.nasa.gov/elev?"/>
		<ContactInformation>
			<ContactPersonPrimary>
				<ContactPerson>Your Name</ContactPerson>
				<ContactOrganization>Your Org</ContactOrganization>
			</ContactPersonPrimary>
			<ContactPosition> </ContactPosition>
			<ContactElectronicMailAddress>someone@somewhere</ContactElectronicMailAddress>
		</ContactInformation>
		<MaxWidth>2048</MaxWidth>
		<MaxHeight>2048</MaxHeight>
	</Service>
	<Capability>...</Capability>
</WMS_Capabilities>
```
#### WMS GetMap Test
Generate a WMS GetMap request to ensure and ensure a response code of 200 and Content-Type of application/bil16. Using a browser with the development tools open on the network tab, enter the following URL and examine the response headers.

```
http://server_ip_address_or_domain/elev?service=WMS&request=GetMap&version=1.3.0&layers=gebco,srtm-cgiar&format=application/bil16&width=512&height=512&styles=&crs=EPSG:4326&bbox=-60,-60,-40,-40
```

## Step 4: Setup Caching
Caching is essential to ensure that costly, common global requests do not hamper system performance.

See [How To Configure Apache Content Caching on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04) by Digital Ocean.
