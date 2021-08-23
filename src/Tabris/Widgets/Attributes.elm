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
