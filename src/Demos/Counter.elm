module Demos.Counter exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--


import Browser
import Html exposing (Html, Attribute, node)
import Html.Events exposing (on)
import Html.Attributes exposing (attribute)
import Json.Decode as Decode


import Tabris.Widgets exposing (app, button, row, stack, text)
import Tabris.Widgets.Attributes as Attributes
import Tabris.Widgets.Attributes.Button as BtnAttrs



-- MAIN


main : Program () Model Msg
main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model = Int


init : Model
init =
  0



-- UPDATE


type Msg
  = Increment
  | Decrement
  | Reset


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

    Reset ->
      init



-- VIEW


onTap : msg -> Attribute msg
onTap msg =
  on "tap-button" (Decode.succeed msg)


view : Model -> Html Msg
view model =
  let
    isEven = (modBy 2 model) == 0
    backgroundColor =
      if isEven then
        "teal"
      else
        "blue"
  in
    app 
      [ Attributes.layoutData "stretch"
      , Attributes.background backgroundColor
      , Attributes.padding [20, 20, 30]
      ]
      [ stack
          [ Attributes.layoutData "stretch"
          , Attributes.alignment "centerX"
          , Attributes.background "yellow"
          , Attributes.cornerRadius 4 
          ] 
          [ row
              [ Attributes.alignment "centerY"
              , Attributes.layoutData "stretchY"
              , Attributes.background "red"
              ]
              [ stack
                  [ Attributes.background "green"
                  , Attributes.alignment "stretchX"
                  , Attributes.spacing "20"
                  ] 
                  [ text
                      [ Attributes.font "44px", Attributes.alignment "centerX" ]
                      (String.fromInt model)
                  , row 
                      [ Attributes.spacing "10" ]
                      [ button
                          [ Attributes.text "Increment"
                          , Attributes.background "#000"
                          , BtnAttrs.textColor "red"
                          , onTap Increment
                          ] []
                      , button
                          [ Attributes.text "Decrement", onTap Decrement ] []
                      ]
                  , button
                      [ Attributes.text "Reset"
                      , onTap Reset
                      , Attributes.bottom "0"
                      ] []
                  ]
              ]
        ]
      ]
