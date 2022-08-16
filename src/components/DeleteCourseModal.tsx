import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { API_URL } from '../shared/constants'
import { useAppContext } from './AppContext'

export const DeleteCourseModal = () => {
  const {
    isOpen,
    onClose,
    finalRef,
    courseToDelete,
    updateCourses,
    setLoading
  } = useAppContext()

  const deleteCourse = useCallback(async () => {
    try {
      const id = courseToDelete?.id
      if (id === undefined) return

      if (onClose) {
        onClose()
      }

      if (setLoading) {
        setLoading(true)
      }

      await fetch(`${API_URL}/courses/${id}`, {
        method: 'DELETE'
      })

      if (updateCourses) {
        updateCourses()
      }

      if (setLoading) {
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    }
  }, [courseToDelete?.id, onClose, setLoading, updateCourses])

  return isOpen && onClose ? (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="400">Deseja deletar este curso?</ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button
            fontWeight="400"
            backgroundColor="#004ECC"
            color="#fff"
            px="2rem"
            mr={3}
            onClick={deleteCourse}
            variant="solid"
            colorScheme="blue"
          >
            Sim
          </Button>
          <Button
            fontWeight="400"
            colorScheme="red"
            variant="solid"
            px="2rem"
            onClick={onClose}
          >
            Não
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ) : null
}
