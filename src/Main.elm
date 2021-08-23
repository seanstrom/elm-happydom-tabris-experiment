module Main exposing (..)

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


import Tabris.Widgets exposing (button, row, stack, text)
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
    maybeResetButton =
      if isEven then
        button [ Attributes.text "Reset", onTap Reset ] []
      else
        node "noscript" [] []
  in
    stack [ Attributes.layoutData "stretch" ] [
      row [ Attributes.alignment "centerY", Attributes.layoutData "center" ]
        [ button [ Attributes.text "Increment", Attributes.background "#000", onTap Increment, BtnAttrs.textColor "red" ] []
        , text (String.fromInt model)
        , button [ Attributes.text "Decrement", onTap Decrement ] []
        , maybeResetButton
        ]
    ]
