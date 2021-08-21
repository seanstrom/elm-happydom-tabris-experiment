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

textAttr : String -> Attribute msg
textAttr text = attribute "text" text

nsButton : List (Attribute msg) -> List (Html msg) -> Html msg
nsButton attrs children =
  node "x-button" attrs children

nsText : String -> Html msg
nsText text = node "x-text" [textAttr text] []

view : Model -> Html Msg
view model =
  let
    isEven = (modBy 2 model) == 0

    maybeResetButton =
      if isEven then
        nsButton [ textAttr "Reset", onTap Reset ] []
      else
        node "noscript" [] []
  in
  node "x-app" []
    [ nsButton [ textAttr "Increment", onTap Increment ] []
    , nsText (String.fromInt model)
    , nsButton [ textAttr "Decrement", onTap Decrement ] []
    , maybeResetButton
    ]
