# How to setup a WorldWind elevation server

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

You can test the Apache configuration with `apachectl`.  It should return Syntax OK.
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
Install the MapServer packages for Apache:
```shell
sudo apt-get install cgi-mapserver mapserver-bin
```

### Configure Apache to run MapServer CGI
Configure Apache to run MapServer on the `/elev` endpoint. 
Add the following content to your Apache configuration file (e.g., `/etc/apache2/sites-enabled/000-default.conf`).  
Note that the MS_MAPFILE variable below refers to a _elev.map_ file at _/opt/mapserver/map/_.  We will create that
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

Prepare the folders used by MapServer:
```shell
sudo mkdir -p /opt/mapserver/map
sudo mkdir -p /opt/mapserver/data
sudo mkdir -p /opt/mapserver/tmp
sudo mkdir -p /opt/mapserver/templates
```

Ensure the MapServer _tmp_ folder can be written to by Apache:
```shell
sudo chown www-data:www-data /opt/mapserver/tmp/
```

Create the _elev.map_ file and the individual layer (\*.lay) files
```shell
sudo touch /opt/mapserver/map/elev.map
sudo touch /opt/mapserver/map/gebco.lay
sudo touch /opt/mapserver/map/bathy.lay
sudo touch /opt/mapserver/map/asterv2.lay
sudo touch /opt/mapserver/map/ned.lay
```

Edit the _elev.map_ file...
```shell
sudo nano /opt/mapserver/map/elev.map
```
... and add the following content. 
Add your contact information as appropriate. 
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
        IMAGEPATH "/opt/mapserver/tmp/" # Path for temp files; writable by www-data
        IMAGEURL "/ms_tmp/"             # Base URL for IMAGEPATH. 
        METADATA
          "ows_title"           "WorldWind Elevation Server"
          "ows_abstract"        "NASA WorldWind WMS Service"
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

      INCLUDE "ned.lay"
      INCLUDE "asterv2.lay"
      INCLUDE "srtm.lay"
      INCLUDE "gebco.lay"
      
    MAP
```

### Configure GEBCO layer
Establish a tile index for the GEBCO data. Place the indexes within the MapServer's _data_ folder instead of
where the GEBCO data is stored so that the data remains portable and shareable. If the data ever is moved, 
just delete the tile indexes and regenerate them for each MapServer instance using the data.

Prepare a folder for the GEBCO tile index:
```shell
sudo mkdir -p /opt/mapserver/data/gebco
```
Build the tile index with the gdaltindex, and create a spatial index with shptree.
Replace the `/data/elevations/gebco/gtif/*.tif` path with the actual path to your data.
Remove the old index first if you are recreating, otherwise gdaltindex will append 
to the existing index.
```shell
cd /opt/mapserver/data/gebco
sudo rm gebco-index.*

sudo gdaltindex gebco-index.shp /data/elevations/gebco/gtif/*.tif
sudo shptree gebco-index.shp
```
Validate the contents of the GEBCO data with ogrinfo:
```shell
ogrinfo -al -fields=yes gebco-index.shp
```

Edit the _gebco.lay_ file...
```shell
sudo nano /opt/mapserver/map/gebco.lay
```
... and add the following content:
```
LAYER
  PROCESSING "RESAMPLE=BILINEAR"
  NAME "GEBCO"
  METADATA
    "wms_title"       "GEBCO"
    "wms_abstract"    "General Bathymetric Chart of the Oceans"
    "wms_keywordlist"    "LastUpdate= 2015-02-27T12:00:00Z"
  END
  TYPE RASTER
  STATUS ON 
  TILEINDEX "gebco/gebco-index.shp" # Path is relative to SHAPEPATH in elev.map
  TILEITEM "Location"
  TYPE RASTER
  #MAXSCALEDENOM 500000
  PROJECTION
    "init=epsg:4326"
  END
END
```


### Configure NASA SRTM layer
Establish a tile index for the SRTM data. Like GEBCO, place the index within the MapServer's _data_ folder instead of
where the SRTM data is stored so the data remains portable and shareable.

Prepare a folder for the SRTM tile index:
```shell
sudo mkdir -p /opt/mapserver/data/srtm
```
Build the tile index with the gdaltindex, and create a spatial index with shptree.
Remove the old index first if you are recreating, otherwise gdaltindex will append 
to the existing index.
```shell
cd /opt/mapserver/data/strm
sudo rm srtm-index.*

sudo gdaltindex srtm-index.shp /data/elevations/srtm/gtif/*.tif
sudo shptree srtm-index.shp
```
Validate the contents of the SRTM index data with ogrinfo:
```shell
ogrinfo -al -fields=yes srtm-index.shp
```
Edit the _srtm.lay_ file...
```shell
sudo nano /opt/mapserver/map/srtm.lay
```
... and add the following content:
```
LAYER
  PROCESSING "RESAMPLE=BILINEAR"
  NAME "NASA_SRTM30_900m_Tiled"
  METADATA
    "wms_title"       "NASA_SRTM30"
    "wms_abstract"    "NASA SRTM with bathy"
    "wms_keywordlist"    "LastUpdate= 2013-07-02T16:26:00Z"
  END
  TYPE RASTER
  STATUS ON 
  TILEINDEX "srtm/srtm-index.shp"
  TILEITEM "Location"
  TYPE RASTER
  #MAXSCALEDENOM 500000
  PROJECTION
    "init=epsg:4326"
  END
END
```

### Configure ASTER v2 layer
Establish a tile index for the ASTERv2 data. Like GEBCO and SRTM, place the index within the MapServer's _data_ folder instead of
where the ASTER data is stored so that the data remains portable and shareable.

Prepare a folder for the ASTER tile index:
```shell
sudo mkdir -p /opt/mapserver/data/asterv2
```
Build the tile index with the gdaltindex, and create a spatial index with shptree.
Replace the `/data/elevations/asterv2/gtif/*.tif` path with the actual path to your data.
Remove the old index first if you are recreating, otherwise gdaltindex will append 
to the existing index.
```shell
cd /opt/mapserver/data/asterv2
sudo rm asterv2-index.*

sudo gdaltindex asterv2-index.shp /data/elevations/asterv2/gtif/*.tif
sudo shptree asterv2-index.shp
```
Validate the contents of the ASTER index data with ogrinfo:
```shell
ogrinfo -al -fields=yes asterv2-index.shp
```
Edit the _asterv2.lay_ file...
```shell
sudo nano /opt/mapserver/map/asterv2.lay
```
... and add the following content:
```
LAYER
  PROCESSING "RESAMPLE=BILINEAR"
  NAME "aster_v2"
  METADATA
    "wms_title"       "ASTER V2"
    "wms_abstract"    "ASTER GDEM Version2"
    "wms_keywordlist"    "LastUpdate= 2013-07-02T16:26:00Z"

    "wcs_label"	"ASTER version 2"  
    "wcs_extent" "-180 -83 180 83"
    "wcs_size" "100 100"
    "wcs_resolution" "0.0002 0.0002"

  END
  TYPE RASTER
  STATUS ON 
  TILEINDEX "asterv2/asterv2-index.shp"
  TILEITEM "Location"
  TYPE RASTER
  #MAXSCALEDENOM 500000
  PROJECTION
    "init=epsg:4326"
  END
END
```

### Configure USGS NED layer
Establish a tile index for the USGS NED data. Like GEBCO, SRTM and ASTER, place the index within the 
MapServer's _data_ folder instead of where the ASTER data is stored so that the data remains portable and shareable.

Prepare a folder for the NED tile index:
```shell
sudo mkdir -p /opt/mapserver/data/ned
```
Build the tile index with the gdaltindex, and create a spatial index with shptree.
Replace the `/data/elevations/ned/gtif/*.tif` path with the actual path to your data.
If you want to reindex/recreate you must remove the old index first.
```shell
cd /opt/mapserver/data/ned
sudo rm ned-index.*

sudo gdaltindex ned-index.shp /data/elevations/ned/gtif/*.tif
sudo shptree ned-index.shp
```
Validate the contents of the ASTER index data with ogrinfo:
```shell
ogrinfo -al -fields=yes asterv2-index.shp
```
Edit the _asterv2.lay_ file...
```shell
sudo nano /opt/mapserver/map/asterv2.lay
```
... and add the following content:
```
LAYER
  PROCESSING "RESAMPLE=BILINEAR"
  NAME "USGS-NED"
  METADATA
    "wms_title"       "USGS NED"
    "wms_abstract"    "USGS NED 10m"
    "wms_keywordlist"    "LastUpdate= 2013-07-02T16:26:00Z"
  END
  TYPE RASTER
  STATUS ON 
  TILEINDEX "ned/ned-index.shp"
  TILEITEM "Location"
  TYPE RASTER
  #MAXSCALEDENOM 500000
  PROJECTION
    "init=epsg:4326"
  END
END
```

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
		<Title>WorldWind Elevation Server</Title>
		<Abstract>NASA WorldWind WMS Service</Abstract>
		<OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://worldwind26.arc.nasa.gov/elev?"/>
		<ContactInformation>
			<ContactPersonPrimary>
				<ContactPerson>Randolph Kim</ContactPerson>
				<ContactOrganization>NASA</ContactOrganization>
			</ContactPersonPrimary>
			<ContactPosition> </ContactPosition>
			<ContactElectronicMailAddress>rkim@mail.arc.nasa.gov</ContactElectronicMailAddress>
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
http://server_ip_address_or_domain/elev?service=WMS&request=GetMap&version=1.3.0&layers=NASA_SRTM30_900m_Tiled,aster_v2,USGS-NED&format=application/bil16&width=512&height=512&styles=&crs=EPSG:4326&bbox=-60,-60,-40,-40
```

## Step 4: Setup Caching
Caching is essential to ensure that costly, common global requests do not hamper system performance.

Select instructions extracted from [How To Configure Apache Content Caching on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04) by Digital Ocean.
> ### Standard HTTP Caching
> The HTTP caching logic is available through the mod_cache module. The actual caching is done with one of the caching providers. Typically, the cache is stored on disk using the mod_cache_disk module, but shared object caching is also available through the mod_cache_socache module.
>
> The mod_cache_disk module caches on disk, so it can be useful if you are proxying content from a remote location, generating it from a dynamic process, or just trying to speed things up by caching on a faster disk than your content typically resides on. This is the most well-tested provider and should probably be your first choice in most cases. The cache is not cleaned automatically, so a tool called `htcacheclean` must be run occasionally to slim down the cache. This can be run manually, set up as a regular cron job, or run as a daemon.

### Enable Apache cache and cache_disk mods
> In order to enable caching, you'll need to enable the mod_cache module as well as one of its caching providers. As we stated above, mod_cache_disk is well tested, so we will rely on that.

On an Ubuntu system, you can enable these modules by typing:
```
sudo a2enmod cache
sudo a2enmod cache_disk
```
> The mod_expires module can set both the Expires header and the max-age option in the Cache-Control header. The mod_headers module can be used to add more specific Cache-Control options to tune the caching policy further.
You can enable these modules by typing:
```
sudo a2enmod expires
sudo a2enmod headers
```

> You will also need to install the apache2-utils package, which contains the `htcacheclean` utility used to pare down the cache when necessary. You can install this by typing:
```
sudo apt-get update
sudo apt-get install apache2-utils
```

> ### Modifying the Global Configuration
> Most of the configuration for caching will take place within individual virtual host definitions or location blocks. However, enabling mod_cache_disk also enables a global configuration that can be used to specify some general attributes. Open that file now to take a look:
```
sudo nano /etc/apache2/mods-enabled/cache_disk.conf
```
> With the comments removed, the file should look like this:
```
<IfModule mod_cache_disk.c>
    CacheRoot /var/cache/apache2/mod_cache_disk
    CacheDirLevels 2
    CacheDirLength 1
</IfModule>
```
We'll use the default values for now.

### Modifying the Virtual Server

Open your virtual host file(s) for the elevation server. For example:
```
sudo nano /etc/apache2/sites-enabled/000-default.conf
```

Add the Apache caching configuration, as follows:

For example:

To start leave the `CacheQuickHandler` off for complete processing of caching rules:
```
        CacheQuickHandler off
```
Setup a locking mechanism based on Apache docs:
```
        CacheLock on
        CacheLockPath /tmp/mod_cache-lock
        CacheLockMaxAge 5
```
Don't store cookies in the cache to prevent leaking of user-specific cookies
```
        CacheIgnoreHeaders Set-Cookie
```
Web WorldWind requests require `CacheIgnoreCacheControl` to be enabled to obtain cache hits. This tells the server to attempt to serve the resource from the cache even if the request contains `no-cache` header values.
```
        CacheIgnoreCacheControl On
```

Now we'll enable caching for the /elev endpoint with a number of directives. `CacheEnable disk` defines the caching implemenation. `CacheHeader on` enables a reponse header that will indicate whether there was a cache hit or miss. Another directive we'll set is CacheDefaultExpire so that we can set an expiration (in seconds) if neither the `Expires` nor the `Last-Modified` headers are set on the content. Similarly, we'll set `CacheMaxExpire` to cap the amount of time items will be saved. We'll set the `CacheLastModifiedFactor` so that Apache can create an expiration date if it has a Last-Modified date, but no expiration. The factor is multiplied by the time since modification to set a reasonable expiration.

The `ExpiresActive on` enables expiration processing. The `ExpiresDefault` directive sets the default expiration time. These will set the `Expires` and the `Cache-Control` "max-age" to the correct values. When you are certain the caching is working as desired, you can extend the expiration time. 

Within the `<Location /elev>` block, add the following cache directives:
```
	CacheEnable disk 
	CacheHeader on

	CacheDefaultExpire 600
	CacheMaxExpire 86400
	CacheLastModifiedFactor 0.5

	ExpiresActive on
	ExpiresDefault "access plus 1 week"

	Header merge Cache-Control public
```

Your edited virtual host .conf file should look like this:
```
<VirtualHost *:80>
    	ServerAdmin webmaster@localhost
	.
	.
	.
	# Apache caching configuration
        CacheQuickHandler off

        CacheLock on
        CacheLockPath /tmp/mod_cache-lock
        CacheLockMaxAge 5

        CacheIgnoreHeaders Set-Cookie
        CacheIgnoreCacheControl On
	
        # MapServer /elev endpoint
        Alias /elev /usr/lib/cgi-bin/mapserv
        <Location /elev>
                CacheEnable disk /elev
                CacheHeader on

                CacheDefaultExpire 600
                CacheMaxExpire 86400
                CacheLastModifiedFactor 0.5

                ExpiresActive on
                ExpiresDefault "access plus 1 week"

                Header merge Cache-Control public

                SetHandler cgi-script
                Options ExecCGI
                SetEnv MS_MAPFILE /opt/mapserver/map/elevations.map
        </Location>	
	.
	.
	.
</VirtualHost>
```	

### Cache Maintenance

_TODO_

### Reference
https://www.digitalocean.com/community/tutorials/web-caching-basics-terminology-http-headers-and-caching-strategies

https://www.digitalocean.com/community/tutorials/how-to-configure-apache-content-caching-on-ubuntu-14-04

See: https://www.howtoforge.com/caching-with-apache-mod_cache-on-debian-etch

## Step 5: Configure fail2ban to prevent DOS
We can use `fail2ban` to help prevent denial-of-service attacks and/or bulk downloads from 


## Stop 5: Configure WorldWind
Now we must configure your WorldWind clients to use the new elevation data.  
This section shows you how to change the URLs in the SDKs to reference 

### WebWorldWind SDK

### WorldWindJava SDK


