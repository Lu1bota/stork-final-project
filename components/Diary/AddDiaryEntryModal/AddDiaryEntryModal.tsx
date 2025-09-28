import { DiaryEntry } from "@/types/diary";
import { AddDiaryEntryForm } from "../AddDiaryEntryForm/AddDiaryEntryForm"
import Modal from "@/components/Modal/Modal";


type AddDiaryEntryModalProps = {
    onClose: () => void,
    title: string,
    entryToEdit?: DiaryEntry | null;
};

export const AddDiaryEntryModal = ({onClose, title, entryToEdit}: AddDiaryEntryModalProps) => {
    return <Modal title={title} onClose={onClose}>
        <AddDiaryEntryForm onSuccess={onClose} entryToEdit={entryToEdit}/>
    </Modal>
}
