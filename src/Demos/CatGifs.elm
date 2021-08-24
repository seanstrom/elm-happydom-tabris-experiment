module Demos.CatGifs exposing (..)

-- Press a button to send a GET request for random cat GIFs.
--
-- Read how it works:
--   https://guide.elm-lang.org/effects/json.html
--

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode exposing (Decoder, field, string)


import Tabris.Widgets exposing (app, button, row, stack, text)
import Tabris.Widgets.Attributes as Attributes
import Tabris.Widgets.Attributes.Button as BtnAttrs
import Tabris.Widgets.Attributes exposing (alignment)



-- MAIN


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model
  = Failure
  | Loading
  | Success String


init : () -> (Model, Cmd Msg)
init _ =
  (Loading, getRandomCatGif)
  -- (Failure, Cmd.none)



-- UPDATE


type Msg
  = MorePlease
  | GotGif (Result Http.Error String)


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (Loading, getRandomCatGif)
      -- (Loading, Cmd.none)

    GotGif result ->
      case result of
        Ok url ->
          (Success url, Cmd.none)

        Err _ ->
          (Failure, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


onTap : msg -> Attribute msg
onTap msg =
  on "tap-button" (Decode.succeed msg)


view : Model -> Html Msg
view model =
  app [ Attributes.layoutData "stretch", Attributes.background "teal", Attributes.padding [15, 15, 30] ] [
    stack [ Attributes.layoutData "stretch", Attributes.alignment "centerX" ]
      [ stack [ Attributes.layoutData "stretch", Attributes.background "yellow", Attributes.alignment "centerX" ]
          [ Tabris.Widgets.text [Attributes.font "44px"] "Random Cats"
          , viewGif model
          ]
      ]
  ]

viewGif : Model -> Html Msg
viewGif model =
  case model of
    Failure ->
      row [Attributes.layoutData "stretch", Attributes.background "red", Attributes.alignment "centerY"]
        [ stack [ Attributes.alignment "centerX", Attributes.spacing "20", Attributes.layoutData "stretchX"]
            [ Tabris.Widgets.text [ Attributes.alignment "centerX", Attributes.font "25px", Attributes.background "blue", Attributes.layoutData "stretchX" ] "I could not load a random cat for some reason."
            , Tabris.Widgets.button [ BtnAttrs.text "Try Again!", onTap MorePlease ] []
            ]
        ]

    Loading ->
      Tabris.Widgets.text [] "Loading..."

    Success url ->
      row [Attributes.layoutData "stretch", Attributes.background "red", Attributes.alignment "centerY"]
        [ stack [ Attributes.alignment "centerX", Attributes.spacing "20", Attributes.layoutData "stretchX" ]
            [ Tabris.Widgets.image [ Attributes.image url, Attributes.layoutData "stretchX" ] []
            , Tabris.Widgets.button [ BtnAttrs.text "More Please!", onTap MorePlease ] []
            ]
        ]



-- HTTP


getRandomCatGif : Cmd Msg
getRandomCatGif =
  Http.get
    { url = "https://api.giphy.com/v1/gifs/random?api_key=pRZDdmRMooOJjuy4pB6QyebUucaGFECi&tag=cat"
    , expect = Http.expectJson GotGif gifDecoder
    }


gifDecoder : Decoder String
gifDecoder =
  field "data" (field "image_url" string)