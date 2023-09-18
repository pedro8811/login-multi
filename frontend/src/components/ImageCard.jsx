import { Checkbox } from '@mui/material'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useState } from 'react'

const CardImage = styled.div`
  margin: 10px;
  padding: 20px;
  border-radius: 7px;
  box-shadow: 0 0 10px rgba(0,0,0,.5);
  p{margin: 0;}
  img{
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    width: 100%;
    margin-bottom: 10px;
  }
`

export const ImageCard = ({ os }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const checkBoxHandler = (e) => {
    let isSelected = e.target.checked
    let value = parseInt(e.target.value)

    if (isSelected) {
      setSelectedItems([...selectedItems, value])
    } else {
      setSelectedItems(prevData => {
        return prevData.filter(id => {
          return id !== value
        })
      })
    }
  }

  console.log(selectedItems)

  return (
    <>
      <CardImage key={os.idimage}>
        <img src={`data:image/jpeg;base64, ${arrayBufferToBase64(os.image.data)}`} />
        <p>ID da imagem: <b>{os.idimage}</b></p>
        <p>ID da ordem de serviço: <b>{os.idos}</b></p>
        <form style={{ display: 'flex' }}>
          <Checkbox
            checked={selectedItems.includes(os.idimage)}
            value={os.idimage}
            onChange={checkBoxHandler} />
        </form>
      </CardImage>
    </>
  )
}

ImageCard.propTypes = {
  os: PropTypes.object.isRequired,
}

