import styled from 'styled-components'
import { styling } from '../../constants'

export const List = ({ list, handleClick }) => (
  <ListWrapper>
    <thead>
      <tr>
        {list &&
          list.length !== 0 &&
          Object.keys(list[0]).map(
            key => key !== 'id' && <th key={key}>{key}</th>
          )}
      </tr>
    </thead>

    <tbody>
      {list && list.length ? (
        list.map(item => (
          <tr key={item.id} onClick={() => handleClick(item)}>
            {Object.keys(item).map(
              key =>
                key !== 'id' && <td key={`${key}${item[key]}`}>{item[key]}</td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td>There's nothing to display.</td>
        </tr>
      )}
    </tbody>
  </ListWrapper>
)

// width: 100%;
// height: 100%;
// overflow-x: hidden;
const ListWrapper = styled.table`
   {
    height: 100%;
    & > thead > tr > th {
      position: sticky;
      top: ${styling.menu_height};
      background-color: ${styling.color.background};
    }
    & > tbody {
      max-height: 100%;
      overflow-y: auto;
    }
    & > tbody > tr:hover {
      box-shadow: ${styling.shadow};
      background-color: ${styling.color.hover};
    }
  }
`
