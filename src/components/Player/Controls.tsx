import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { Button, Space, Tooltip } from 'antd'
import { Context } from '../../context/Context'
import { searchArtistInfo } from '../../helpers/search'
import { random } from '../../helperFunctions'
import PlayIcon from './play.svg'
import RewindIcon from './rewind.svg'
import ForwardIcon from './forward.svg'
const { DZ } = window

function Controls({ repeat }: { repeat: boolean }) {
  const { state, dispatch } = useContext(Context)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const changeIsPlaying = (): void => {
    setIsPlaying(!isPlaying)
    isPlaying ? DZ?.player.pause() : DZ?.player.play()
  }

  const changeTrack = (): void => {
    setIsPlaying(true)
    DZ?.player.pause()
    repeat ? DZ.player.setRepeat(2) : random(state, dispatch)
  }

  const rewind = (): void => {
    setIsPlaying(true)
    DZ?.player.pause()
    if (state.previousTracks?.length && state.track) {
      const previousTrack = state.previousTracks[state.previousTracks.length - 1]
      dispatch({ type: 'CHANGE_TRACK', payload: previousTrack })
      dispatch({ type: 'PREV_TRACK', payload: previousTrack })
      searchArtistInfo(previousTrack, dispatch)
    }
  }

  DZ?.Event.subscribe('track_end', () => {
    changeTrack()
  })

  useEffect(() => {
    changeTrack()
  }, [])

  return (
    <Space className="Controls" align="center">
      <Tooltip title="Previous">
        <Button onClick={rewind} type="text" disabled={state.previousTracks?.length === 0}>
          <ReactSVG src={RewindIcon} />
        </Button>
      </Tooltip>
      <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
        <Button onClick={changeIsPlaying} type="text">
          {isPlaying ? (
            <img src="/assets/images/pause.png" alt="pause button" width="24px" style={{ verticalAlign: 'baseline' }} />
          ) : (
            <ReactSVG src={PlayIcon} />
          )}
        </Button>
      </Tooltip>
      <Tooltip title="Next">
        <Button onClick={changeTrack} type="text">
          <ReactSVG src={ForwardIcon} />
        </Button>
      </Tooltip>
    </Space>
  )
}

export default Controls
