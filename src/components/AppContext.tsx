import { useDisclosure } from '@chakra-ui/react'
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  MutableRefObject
} from 'react'
import { API_URL } from '../shared/constants'
import { ICourse, IGrades, ILevels } from '../shared/types'

interface IContext {
  courses?: ICourse[]
  setCourses?: Dispatch<SetStateAction<ICourse[]>>
  levels?: ILevels
  setLevels?: Dispatch<SetStateAction<ILevels | undefined>>
  grades?: IGrades
  setGrades?: Dispatch<SetStateAction<IGrades | undefined>>

  currentCourses?: ICourse[]
  setCurrentCourses?: Dispatch<SetStateAction<ICourse[]>>
  currentPage?: number
  setCurrentPage?: Dispatch<SetStateAction<number>>
  itemLimit?: number
  setItemLimit?: Dispatch<SetStateAction<number>>

  filteredCourses?: any
  setFilteredCourses?: any

  creatingCourse?: boolean
  setCreatingCourse?: Dispatch<SetStateAction<boolean>>

  editingCourse?: ICourse
  setEditingCourse?: Dispatch<SetStateAction<ICourse | undefined>>

  updateCourses?: () => void

  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  finalRef?: MutableRefObject<null>
  courseToDelete?: ICourse | undefined
  setCourseToDelete?: Dispatch<SetStateAction<ICourse | undefined>>

  loading?: boolean
  setLoading?: Dispatch<SetStateAction<boolean>>
}

type IAppContextProvider = React.FC<{ children: JSX.Element }>

const AppContext = createContext<IContext>({})

export const AppContextProvider: IAppContextProvider = ({ children }) => {
  // API info
  const [courses, setCourses] = useState<ICourse[]>([])
  const [levels, setLevels] = useState<ILevels | undefined>()
  const [grades, setGrades] = useState<IGrades | undefined>()

  // pagination
  const [currentCourses, setCurrentCourses] = useState<ICourse[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [itemLimit, setItemLimit] = useState(5)

  // courses list
  const [filteredCourses, setFilteredCourses] = useState([])

  // creating course
  const [creatingCourse, setCreatingCourse] = useState(false)

  // editing course
  const [editingCourse, setEditingCourse] = useState<ICourse | undefined>()

  // delete course modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [courseToDelete, setCourseToDelete] = useState<ICourse | undefined>()

  const [loading, setLoading] = useState(false)

  // update current courses
  useEffect(() => {
    if (!filteredCourses) return

    const offset = currentPage * itemLimit
    const courseList = filteredCourses.length > 0 ? filteredCourses : courses
    setCurrentCourses(courseList.slice(offset, offset + itemLimit))
  }, [currentPage, itemLimit, setCurrentCourses, filteredCourses, courses])

  const updateCourses = useCallback(() => {
    fetch(`${API_URL}/courses`)
      .then((response) => response.json())
      .then(setCourses)
  }, [])

  const values = useMemo(
    () => ({
      courses,
      setCourses,
      levels,
      setLevels,
      grades,
      setGrades,
      currentCourses,
      setCurrentCourses,
      currentPage,
      setCurrentPage,
      itemLimit,
      setItemLimit,
      filteredCourses,
      setFilteredCourses,
      creatingCourse,
      setCreatingCourse,
      editingCourse,
      setEditingCourse,
      updateCourses,
      isOpen,
      onOpen,
      onClose,
      finalRef,
      courseToDelete,
      setCourseToDelete,
      loading,
      setLoading
    }),
    [
      courseToDelete,
      courses,
      creatingCourse,
      currentCourses,
      currentPage,
      editingCourse,
      filteredCourses,
      grades,
      isOpen,
      itemLimit,
      levels,
      loading,
      onClose,
      onOpen,
      updateCourses
    ]
  )

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}
