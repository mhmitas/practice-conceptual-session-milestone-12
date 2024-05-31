import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  // console.log(category === label);

  function handleClick() {
    const query = queryString.stringifyUrl({
      url: '/',
      query: {
        category: label
      }
    })
    // console.log(query);
    navigate(query)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        transition
        cursor-pointer
        ${category === label && 'border-b-rose-600 text-rose-600'}
        `
      }
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
