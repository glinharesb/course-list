import {
  Box,
  Text,
  Heading,
  Divider,
  Flex,
  FormLabel,
  Select,
  Input,
  Button,
  useToast
} from '@chakra-ui/react'
import { FormEvent, useCallback, useState } from 'react'
import { API_URL } from '../shared/constants'
import { useAppContext } from './AppContext'
import { BackIcon, SelectIcon } from './Icons'

interface ICreateCourse {
  code: string
  name: string
  level: string
  grade: string
}

export const CreateCourse = () => {
  const {
    courses,
    levels,
    grades,
    setCreatingCourse,
    updateCourses,
    setLoading
  } = useAppContext()
  const toast = useToast()

  // input values
  const [courseGradeValue, setCourseGradeValue] = useState('')
  const [courseLevelValue, setCourseLevelValue] = useState('')
  const [courseNameValue, setCourseNameValue] = useState('')
  const [courseCodeValue, setCourseCodeValue] = useState('')

  // input errors
  const [courseCodeError, setCourseCodeError] = useState(false)
  const [courseNameError, setCourseNameError] = useState(false)
  const [courseLevelError, setCourseLevelError] = useState(false)
  const [courseGradeError, setCourseGradeError] = useState(false)

  const createCourse = useCallback(
    async ({ code, name, level, grade }: ICreateCourse) => {
      try {
        if (!courses) return

        // validate course name and grade
        const hasCourseWithSameName =
          courses.filter(
            (course) => course.name.toLowerCase() === name.toLowerCase()
          ).length > 0

        const hasCourseWithSameGrade =
          courses.filter(
            (course) => course.grade.toLowerCase() === grade.toLowerCase()
          )?.length > 0

        if (hasCourseWithSameName && hasCourseWithSameGrade) {
          throw {
            title: 'Este curso já existe!',
            description:
              'Encontramos um curso com este mesmo nome cadastrado, verifique os campos e tente novamente'
          }
        }

        await fetch(`${API_URL}/courses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code, name, level, grade })
        })

        if (!updateCourses) return

        updateCourses()

        toast({
          title: 'Curso cadastrado com sucesso!',
          status: 'success',
          isClosable: true
        })
      } catch (error: any) {
        const title = error?.title
        const description = error?.description
        if (!title || !description) return console.error(error)

        toast({
          title,
          description,
          status: 'error',
          isClosable: true
        })

        return false
      }

      return true
    },
    [courses, toast, updateCourses]
  )

  const onSubmitForm = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()

      setCourseCodeError(!courseCodeValue.length)
      setCourseNameError(!courseNameValue.length)
      setCourseLevelError(!courseLevelValue.length)
      setCourseGradeError(!courseGradeValue.length)

      if (
        !courseCodeValue.length ||
        !courseNameValue.length ||
        !courseLevelValue.length ||
        !courseGradeValue.length
      ) {
        return
      }

      setLoading && setLoading(true)

      const response = await createCourse({
        code: courseCodeValue,
        name: courseNameValue,
        level: courseLevelValue,
        grade: courseGradeValue
      })

      updateCourses && updateCourses()
      setLoading && setLoading(false)

      if (!response) return

      setCreatingCourse && setCreatingCourse(false)
    },
    [
      courseCodeValue,
      courseGradeValue,
      courseLevelValue,
      courseNameValue,
      createCourse,
      setCreatingCourse,
      setLoading,
      updateCourses
    ]
  )

  return (
    <Box backgroundColor="#F3F6F9">
      <Box
        backgroundColor="#fff"
        paddingX={{ base: '1rem', lg: '2.5rem' }}
        paddingY="2rem"
      >
        <Heading as="h6" fontSize="1.25rem" color="#334B61" fontWeight="500">
          Criar novo curso
        </Heading>
        <Divider paddingTop="1rem" marginBottom="1rem" />
        <Flex
          justifyContent="space-between"
          marginBottom="2.5rem"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Text fontWeight="500" color="#52799A">
            Dados do curso
          </Text>
          <Text fontSize="0.75rem" color="#3C5871">
            Todos os campos dessa página são obrigatórios
          </Text>
        </Flex>
        <form onSubmit={onSubmitForm}>
          <Flex flexDirection="column" gap="2rem">
            <Flex gap="1.875rem" flexDirection={{ base: 'column', lg: 'row' }}>
              <Box flexBasis="50%">
                <FormLabel fontSize="0.875rem" fontWeight="500" color="#3C5871">
                  Nível escolar
                </FormLabel>
                <Select
                  height="3.75rem"
                  backgroundColor={courseLevelError ? '#F6E4DF' : '#F3F6F9'}
                  borderColor={courseLevelError ? '#BC3206' : '#9DB2CA'}
                  borderWidth={courseLevelError ? '2px' : '1px'}
                  onChange={({ target }) => {
                    setCourseLevelValue(target.value)

                    if (courseLevelError && target.value.length > 0) {
                      setCourseLevelError(false)
                    }
                  }}
                  icon={<SelectIcon />}
                >
                  <option value="" selected disabled hidden>
                    Selecione o nível
                  </option>
                  <option value="UniversityGraduate">
                    {levels?.UniversityGraduate}
                  </option>
                  <option value="PostGraduate">{levels?.PostGraduate}</option>
                </Select>
                <Text fontSize="0.75rem" color="#BC3206">
                  {courseLevelError && 'Este campo é obrigatório!'}
                </Text>
              </Box>
              <Box flexBasis="50%">
                <FormLabel fontSize="0.875rem" fontWeight="500" color="#3C5871">
                  Grau
                </FormLabel>
                <Select
                  height="3.75rem"
                  backgroundColor={courseGradeError ? '#F6E4DF' : '#F3F6F9'}
                  borderColor={courseGradeError ? '#BC3206' : '#9DB2CA'}
                  borderWidth={courseGradeError ? '2px' : '1px'}
                  onChange={({ target }) => {
                    setCourseGradeValue(target.value)

                    if (courseGradeError && target.value.length > 0) {
                      setCourseGradeError(false)
                    }
                  }}
                  icon={<SelectIcon />}
                >
                  <option value="" selected disabled hidden>
                    Selecione o grau
                  </option>
                  {grades &&
                    Object.values(grades).map((grade: Object) =>
                      Object.values(grade).map(
                        (children: string, index: number) => (
                          <option
                            key={children}
                            value={Object.keys(grade)[index]}
                          >
                            {children}
                          </option>
                        )
                      )
                    )}
                </Select>
                <Text fontSize="0.75rem" color="#BC3206">
                  {courseGradeError && 'Este campo é obrigatório!'}
                </Text>
              </Box>
            </Flex>
            <Box>
              <FormLabel fontSize="0.875rem" fontWeight="500" color="#3C5871">
                Nome do curso
              </FormLabel>
              <Input
                paddingY="1.75rem"
                paddingX="1.5rem"
                backgroundColor={courseNameError ? '#F6E4DF' : '#F3F6F9'}
                borderColor={courseNameError ? '#BC3206' : '#9DB2CA'}
                borderWidth={courseNameError ? '2px' : '1px'}
                value={courseNameValue}
                onChange={({ target }) => {
                  setCourseNameValue(target.value)

                  if (courseNameError && target.value.length > 0) {
                    setCourseNameError(false)
                  }
                }}
              />
              <Text fontSize="0.75rem" color="#BC3206">
                {courseNameError && 'Este campo é obrigatório!'}
              </Text>
            </Box>
            <Flex>
              <Box flexBasis={{ base: '1005', lg: '30%' }}>
                <FormLabel fontSize="0.875rem" fontWeight="500" color="#3C5871">
                  Código do curso
                </FormLabel>
                <Input
                  paddingY="1.75rem"
                  paddingX="1.5rem"
                  backgroundColor={courseCodeError ? '#F6E4DF' : '#F3F6F9'}
                  borderColor={courseCodeError ? '#BC3206' : '#9DB2CA'}
                  borderWidth={courseCodeError ? '2px' : '1px'}
                  value={courseCodeValue}
                  onChange={({ target }) => {
                    setCourseCodeValue(target.value)

                    if (courseCodeError && target.value.length > 0) {
                      setCourseCodeError(false)
                    }
                  }}
                />
                <Text fontSize="0.75rem" color="#BC3206">
                  {courseCodeError && 'Este campo é obrigatório!'}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Divider
            paddingTop="4rem"
            marginBottom="2.5rem"
            borderColor="#DBE3EC"
          />
          <Flex justifyContent="flex-end" gap="2rem">
            <Button
              height="3rem"
              onClick={() => setCreatingCourse && setCreatingCourse(false)}
              fontSize="0.875rem"
              color="#004ECC"
              gap="0.5rem"
              backgroundColor="transparent"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
            >
              <BackIcon />
              Voltar
            </Button>
            <Button variant="primary" paddingX="3.5rem" type="submit">
              Salvar
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
