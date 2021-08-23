module Tabris.Widgets exposing (..)

import Html exposing (Html, Attribute, node)
import Tabris.Widgets.Attributes as Attributes



button : List (Attribute msg) -> List (Html msg) -> Html msg
button attrs children =
  node "x-button" attrs children


text : String -> Html msg
text data = node "x-text" [Attributes.text data] []


row : List (Attribute msg) -> List (Html msg) -> Html msg
row attrs children =
  node "x-row" attrs children
