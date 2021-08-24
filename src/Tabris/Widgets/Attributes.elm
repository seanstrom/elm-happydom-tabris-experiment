module Tabris.Widgets.Attributes exposing (..)

import Html exposing (Attribute, node)
import Html.Attributes exposing (attribute)



fromBool : Bool -> String
fromBool bool =
  case bool of
      True -> "true"
      False -> "false"


text : String -> Attribute msg
text data = attribute "text" data


alignment : String -> Attribute msg
alignment setting = attribute "alignment" setting


spacing : String -> Attribute msg
spacing setting = attribute "spacing" setting


enabled : Bool -> Attribute msg
enabled setting = attribute "enabled" (fromBool setting)


visible : Bool -> Attribute msg
visible setting = attribute "visible" (fromBool setting)


elevation : Int -> Attribute msg
elevation index = attribute "elevation" (String.fromInt index)


background : String -> Attribute msg
background color = attribute "background" color


opacity : Float -> Attribute msg
opacity value = attribute "opacity" (String.fromFloat value)


highlightOnTouch : Bool -> Attribute msg
highlightOnTouch setting = attribute "highlightontouch" (fromBool setting)


cornerRadius : Int -> Attribute msg
cornerRadius radius = attribute "cornerradius" (String.fromInt radius)


layoutData : String -> Attribute msg
layoutData kind = attribute "layoutdata" kind


height : String -> Attribute msg
height setting = attribute "height" setting


width : String -> Attribute msg
width setting = attribute "width" setting


left : String -> Attribute msg
left setting = attribute "left" setting


right : String -> Attribute msg
right setting = attribute "right" setting


top : String -> Attribute msg
top setting = attribute "top" setting


bottom : String -> Attribute msg
bottom setting = attribute "bottom" setting


image : String -> Attribute msg
image src = attribute "image" src


font : String -> Attribute msg
font setting = attribute "font" setting
