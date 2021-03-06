import React, { useEffect, useContext, useState } from 'react'
import fetchJsonp from 'fetch-jsonp'
import { StateContext, DispatchContext } from '../../context/Context'
import Artist from '../Artist/Artist'
import Playlist from '../Playlist/Playlist'
import Carousel from '../Carousel/Carousel'
import Album from '../Album/Album'
import { StateType } from '../../reducers'
import Tracks from '../Tracks/Tracks'
import Spin from '../Spin/Spin'

const Homepage = () => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)
  const [index, setIndex] = useState<number>(0)

  const loadMore = async () => {
    const resp = await (await fetchJsonp(`https://api.deezer.com/chart?index=${index}&limit=20&output=jsonp`)).json()
    const data = await resp
    dispatch({
      type: 'TOP_CHART',
      payload: data
    })
    setIndex(index + 20)
  }

  const onSlideChange = (currentSlide: number, nextSlide: number) => {
    if (nextSlide < currentSlide) {
      loadMore()
    }
  }

  useEffect(() => {
    if (!state.topChart) {
      loadMore()
    }
  }, [])

  return state.topChart ? (
    <div className="Homepage" data-testid="homepage">
      <Carousel
        className="playlists"
        title="Popular playlists"
        slider
        data={state.topChart?.playlists?.data}
        onSlideChange={onSlideChange}
      >
        <Playlist />
      </Carousel>
      <Carousel
        className="artists"
        title="Popular artists"
        slider
        data={state.topChart?.artists?.data}
        onSlideChange={onSlideChange}
        rounded
      >
        <Artist />
      </Carousel>
      <Carousel
        className="albums"
        title="Most streamed albums"
        slider
        data={state.topChart?.albums?.data}
        onSlideChange={onSlideChange}
      >
        <Album />
      </Carousel>
      <Tracks data={state.topChart?.tracks?.data} title="Popular tracks" />
    </div>
  ) : (
    <Spin />
  )
}

export default Homepage
