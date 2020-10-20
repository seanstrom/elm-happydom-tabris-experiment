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


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1



-- VIEW


onIncrement: Attribute Msg
onIncrement =
  on "tap-increment" (Decode.succeed Increment)


onDecrement: Attribute Msg
onDecrement =
  on "tap-decrement" (Decode.succeed Decrement)


view : Model -> Html Msg
view model =
  node "x-yay"
    [ attribute "count" (String.fromInt model)
    , onIncrement
    , onDecrement
    ]
    []
