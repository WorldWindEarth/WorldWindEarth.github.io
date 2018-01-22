# DarkDoc Theme

DarkDoc Theme is a [bootstrap](http://getbootstrap.com/) to document a project. It will create links to github downloads and demo web site if any and display project stars.

![Hugo DarkDoc Theme screenshot](https://raw.githubusercontent.com/adejoux/hugo-darkdoc-theme/master/images/screenshot.png)

## Installation

Inside the folder of your Hugo site run:

    $ mkdir themes
    $ cd themes
    $ git clone https://github.com/adejoux/hugo-darkdoc-theme

For more information read the official [setup guide](//gohugo.io/overview/installing/) of Hugo.

# example web site

Take a look inside the [`exampleSite`](//github.com/adejoux/hugo-darkdoc-theme/tree/master/exampleSite) folder of this theme.

It's a example website you can use as starting point to build your site.
You'll find a file called [`config.toml`](//github.com/adejoux/hugo-darkdoc-theme/blob/master/exampleSite/config.toml). To use it, copy it in the root folder of your Hugo site. Change the parameters accordingly to your site.

# features

## syntax highlighting

It's using python pygments. Install it easily with pip or your system packages:
~~~
pip install pygments
~~~

## gallery

This theme use [fancybox](http://fancyapps.com/fancybox/) to display gallery images.
~~~
{{< gallery image="space1.jpg" >}}
{{< gallery image="space2.jpg" addclass="hidden" >}}
~~~

## menu

The main menu entry are specified in [`config.toml`](//github.com/adejoux/hugo-darkdoc-theme/blob/master/exampleSite/config.toml):
~~~toml
[[menu.main]]
	name   = "Demo"
	url    = "demo/"
	weight = 0
~~~

Each document can be attached to a entry by adding this elements in the frontmatter section:
~~~yaml
menu:
  main:
    parent: Demo
    identifier: /demo/live
    weight: 10
~~~


To add a menu
# Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](//github.com/adejoux/hugo-darkdoc-theme/issues) to let me know. Or make directly a [pull request](//github.com/adejoux/hugo-darkdoc-theme/pulls).


# License

This theme is released under the MIT License. For more information read the [License](//github.com/adejoux/hugo-darkdoc-theme/blob/master/LICENSE).


# Annotations

Thanks to [Steve Francia](//github.com/spf13) for creating Hugo and the awesome community around the project.
