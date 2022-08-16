import { Box, Container, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAppContext } from '../components/AppContext'
import { SectionCreateCourse } from '../components/SectionCreateCourse'
import { CreateCourse } from '../components/CreateCourse'
import { Header } from '../components/Header'
import { ListCourses } from '../components/ListCourses'
import { SearchCourse } from '../components/SearchCourse'
import { ICourse, IGrades, ILevels } from '../shared/types'
import { API_URL } from '../shared/constants'
import { DeleteCourseModal } from '../components/DeleteCourseModal'
import { EditCourse } from '../components/EditCourse'

export async function getStaticProps() {
  const [courses, levels, grades] = await Promise.all([
    fetch(`${API_URL}/courses`),
    fetch(`${API_URL}/levels`),
    fetch(`${API_URL}/grades`)
  ])

  return {
    props: {
      courses: await courses.json(),
      levels: await levels.json(),
      grades: await grades.json()
    },
    revalidate: 60
  }
}

const Home = ({
  courses,
  levels,
  grades,
  APIUrl
}: {
  courses: ICourse[]
  levels: ILevels
  grades: IGrades
  APIUrl: string
}) => {
  const {
    setCourses,
    setLevels,
    setGrades,
    creatingCourse,
    editingCourse,
    loading
  } = useAppContext()

  useEffect(() => {
    if (setCourses && courses) {
      setCourses(courses)
    }

    if (setLevels && levels) {
      setLevels(levels)
    }

    if (setGrades && grades) {
      setGrades(grades)
    }
  }, [APIUrl, courses, grades, levels, setCourses, setGrades, setLevels])

  useEffect(() => {
    document.documentElement.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <Box backgroundColor="#F3F6F9" minHeight="100vh">
      <Container
        maxW="1360px"
        paddingX={{ base: '1rem', lg: '2rem' }}
        paddingBottom="4rem"
      >
        <Header />
        {!creatingCourse && editingCourse === undefined ? (
          <>
            <SectionCreateCourse />
            <SearchCourse />
            <ListCourses />
            <DeleteCourseModal />
          </>
        ) : creatingCourse ? (
          <CreateCourse />
        ) : (
          <EditCourse />
        )}
        {loading && (
          <Box
            position="fixed"
            width="100vw"
            height="100vh"
            top="0"
            left="0"
            alignItems="center"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="3"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Home
