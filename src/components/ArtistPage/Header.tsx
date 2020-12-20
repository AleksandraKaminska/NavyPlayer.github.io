import React, { useContext } from 'react'
import { Row, Col, Typography, Button, Space } from 'antd'
import { StateContext, DispatchContext } from '../../context/Context'
import { changeArtistTrackList } from '../../helperFunctions'
import { StateType } from '../../reducers'
import { ArtistType } from '../../types/deezerData'

const numberWithSpaces = (n?: number) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

const Header = ({ artist }: { artist: ArtistType }) => {
  const dispatch = useContext<React.Dispatch<any>>(DispatchContext)
  const state = useContext<StateType>(StateContext)

  return (
    <Row
      gutter={[16, 12]}
      className="name"
      style={{
        backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0) 10%, #000a11 95%), url(${artist?.picture_xl})`
      }}
    >
      <Col>
        <Typography.Title>{artist?.name}</Typography.Title>
      </Col>
      <Col>
        <Space size="large">
          <Typography.Text>{numberWithSpaces(artist?.nb_fan)} fans</Typography.Text>
          <Button type="primary" onClick={() => changeArtistTrackList(state, dispatch, artist)}>
            Listen
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Header
