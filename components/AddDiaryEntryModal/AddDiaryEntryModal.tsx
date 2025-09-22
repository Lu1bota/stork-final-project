import { AddDiaryEntryForm } from "../AddDiaryEntryForm/AddDiaryEntryForm"
import Modal from "../Modal/Modal"

type AddDiaryEntryModalProps = {
    onClose: () => void,
    title: string
};

export const AddDiaryEntryModal = ({onClose, title}: AddDiaryEntryModalProps) => {
    return <Modal title={title} onClose={onClose}>
        <AddDiaryEntryForm />
    </Modal>
}
