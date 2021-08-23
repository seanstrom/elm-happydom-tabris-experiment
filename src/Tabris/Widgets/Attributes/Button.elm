module Tabris.Widgets.Attributes.Button exposing (..)

import Html exposing (Attribute, node)
import Html.Attributes exposing (attribute)



style : String -> Attribute msg
style kind = attribute "style" kind


strokeColor : String -> Attribute msg
strokeColor color = attribute "strokecolor" color


strokeWidth : String -> Attribute msg
strokeWidth measurement = attribute "strokewidth" measurement


alignment : String -> Attribute msg
alignment setting = attribute "alignment" setting


autoCapitalize : String -> Attribute msg
autoCapitalize setting = attribute "autocapitalize" setting


imageSrc : String -> Attribute msg
imageSrc src = attribute "imagesrc" src


imageTintColor : String -> Attribute msg
imageTintColor color = attribute "imagetintcolor" color


text : String -> Attribute msg
text data = attribute "text" data


textColor : String -> Attribute msg
textColor color = attribute "textcolor" color


font : String -> Attribute msg
font name = attribute "font" name
