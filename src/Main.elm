module Main exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--


import Browser
import Html exposing (Html, Attribute, button, div, text, node)
import Html.Events exposing (on)
import Html.Attributes exposing (attribute)
import Json.Decode as Decode



-- MAIN


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


onIncrement: Attribute Msg
onIncrement =
  on "tap-button" (Decode.succeed Increment)


onDecrement: Attribute Msg
onDecrement =
  on "tap-button" (Decode.succeed Decrement)

onReset: Attribute Msg
onReset =
  on "tap-button" (Decode.succeed Reset)


view : Model -> Html Msg
view model =
  let
    isEven = (modBy 2 model) == 0

    maybeResetButton =
      if isEven then
        node "x-button" [ attribute "text" "Reset", onReset ] []
      else
        node "noscript" [] []
  in
  node "x-app" []
    [ node "x-button" [ attribute "text" "Increment", onIncrement ] []
    , node "x-text" [ attribute "text" (String.fromInt model) ] []
    , node "x-button" [ attribute "text" "Decrement", onDecrement ] []
    , maybeResetButton
    ]
