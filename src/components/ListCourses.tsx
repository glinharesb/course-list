import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Flex,
  Select,
  Button,
  Text,
  Box
} from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { capitalizeFirstLetter } from '../shared/capitalizeFirstLetter'
import { ICourse } from '../shared/types'
import { useAppContext } from './AppContext'
import {
  EditIcon,
  DeleteIcon,
  ArrowLeft,
  ArrowRight,
  SelectIcon
} from './Icons'

export const ListCourses = () => {
  const {
    courses,
    levels,
    grades,
    currentCourses,
    currentPage,
    setCurrentPage,
    itemLimit,
    setItemLimit,
    filteredCourses,
    onOpen,
    setCourseToDelete,
    setEditingCourse
  } = useAppContext()

  const courseList = useMemo(() => {
    return filteredCourses.length > 0 ? filteredCourses : courses
  }, [courses, filteredCourses])

  const previusPage = useCallback(() => {
    if (currentPage === undefined || !setCurrentPage) return

    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage, setCurrentPage])

  const nextPage = useCallback(() => {
    if (
      itemLimit === undefined ||
      currentPage === undefined ||
      !setCurrentPage
    ) {
      return
    }

    if (currentPage + 1 <= Math.ceil(courseList.length / itemLimit)) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, courseList, itemLimit, setCurrentPage])

  const minItem = useMemo(() => {
    if (!itemLimit || currentPage === undefined) return

    return itemLimit * currentPage + 1
  }, [currentPage, itemLimit])

  const maxItem = useMemo(() => {
    if (!itemLimit || !currentCourses || currentPage === undefined) {
      return
    }

    // last items
    if (currentPage + 1 === Math.ceil(courseList.length / itemLimit)) {
      return courseList.length
    }

    return currentCourses.length * (currentPage + 1)
  }, [courseList.length, currentCourses, currentPage, itemLimit])

  const canDisablePreviusButton = useMemo(() => {
    if (currentPage !== 0) return false

    return true
  }, [currentPage])

  const canDisableNextButton = useMemo(() => {
    if (!itemLimit || currentPage === undefined) return false
    if (currentPage + 1 !== Math.ceil(courseList?.length / itemLimit))
      return false

    return true
  }, [courseList, currentPage, itemLimit])

  const actualPage = useMemo(() => {
    if (currentPage === undefined) return

    return currentPage + 1
  }, [currentPage])

  const lastPage = useMemo(() => {
    if (!itemLimit) return

    return Math.ceil(courseList?.length / itemLimit)
  }, [courseList, itemLimit])

  const openDeleteCourseModal = useCallback(
    (course: ICourse) => {
      if (onOpen) {
        onOpen()
      }

      if (setCourseToDelete) {
        setCourseToDelete(course)
      }
    },
    [onOpen, setCourseToDelete]
  )

  return (
    <Box
      backgroundColor="#fff"
      padding="1.5rem"
      borderRadius="0.5rem"
      borderColor="#DBE3EC"
      borderWidth="1px"
    >
      <TableContainer marginBottom="2rem">
        <Table>
          <Thead>
            <Tr>
              <Th
                textTransform="initial"
                color="#698AAE"
                fontSize="0.875rem"
                borderColor="#DBE3EC"
                fontWeight="500"
              >
                Código
              </Th>
              <Th
                textTransform="initial"
                color="#698AAE"
                fontSize="0.875rem"
                borderColor="#DBE3EC"
                fontWeight="500"
              >
                Nome
              </Th>
              <Th
                textTransform="initial"
                color="#698AAE"
                fontSize="0.875rem"
                borderColor="#DBE3EC"
                fontWeight="500"
              >
                Nível escolar
              </Th>
              <Th
                textTransform="initial"
                color="#698AAE"
                fontSize="0.875rem"
                borderColor="#DBE3EC"
                fontWeight="500"
              >
                Grau
              </Th>
              <Th
                textTransform="initial"
                color="#698AAE"
                fontSize="0.875rem"
                borderColor="#DBE3EC"
                fontWeight="500"
              >
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentCourses?.map((course: ICourse, index: number) => (
              <Tr key={index} color="#495057">
                <Td>{course.code}</Td>
                <Td>{capitalizeFirstLetter(course.name)}</Td>
                <Td>{(levels as any)?.[course.level] ?? course.level}</Td>
                <Td>
                  {(grades as any)?.[course.level]?.[course.grade] ??
                    course.grade}
                </Td>
                <Td>
                  <Flex gap={4} justifyContent="center">
                    <Box
                      cursor="pointer"
                      onClick={() =>
                        setEditingCourse && setEditingCourse(course)
                      }
                    >
                      <EditIcon />
                    </Box>
                    <Box
                      onClick={() => openDeleteCourseModal(course)}
                      cursor="pointer"
                    >
                      <DeleteIcon />
                    </Box>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex
        backgroundColor="#F1F3F5"
        paddingX="1.5rem"
        paddingY="1rem"
        justifyContent="space-between"
        borderRadius="0.5rem"
        alignItems="center"
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '1rem', lg: 'unset' }}
      >
        <Box>
          <Text color="#495057" fontWeight="500" fontSize="0.875rem">
            {`${minItem} - ${maxItem} de ${courseList?.length}`}
          </Text>
        </Box>

        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={{ base: '1rem', lg: 'unset' }}
        >
          <Flex alignItems="center" gap="1rem">
            <Text
              whiteSpace="nowrap"
              color="#495057"
              fontWeight="500"
              fontSize="0.875rem"
            >
              Linhas por página
            </Text>
            <Select
              size={{ base: 'sm', lg: 'md' }}
              onChange={(event) => {
                setItemLimit && setItemLimit(Number(event.target.value))
                setCurrentPage && setCurrentPage(0)
              }}
              borderColor="#9DB2CA"
              borderRadius="8px"
              cursor="pointer"
              icon={<SelectIcon />}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Button
              onClick={() => previusPage()}
              disabled={canDisablePreviusButton}
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
            >
              <ArrowLeft />
            </Button>
            <Text color="#495057" fontWeight="500" fontSize="0.875rem">
              {`${actualPage} de ${lastPage}`}
            </Text>
            <Button
              onClick={nextPage}
              disabled={canDisableNextButton}
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
            >
              <ArrowRight />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
