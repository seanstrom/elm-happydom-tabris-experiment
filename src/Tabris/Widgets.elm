module Tabris.Widgets exposing (..)

import Html exposing (Html, Attribute, node)
import Tabris.Widgets.Attributes as Attributes



button : List (Attribute msg) -> List (Html msg) -> Html msg
button attrs children =
  node "x-button" attrs children


text : List (Attribute msg) -> String -> Html msg
text attrs data = node "x-text" ([Attributes.text data] ++ attrs) []


app : List (Attribute msg) -> List (Html msg) -> Html msg
app attrs children =
  node "x-app" attrs children 


row : List (Attribute msg) -> List (Html msg) -> Html msg
row attrs children =
  node "x-row" attrs children


stack : List (Attribute msg) -> List (Html msg) -> Html msg
stack attrs children =
  node "x-stack" attrs children


image : List (Attribute msg) -> List (Html msg) -> Html msg
image attrs children =
  node "x-image" attrs children
