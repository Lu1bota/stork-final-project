export const formattingDate = (dateString: string) => {

    if (!dateString) {
        return 'Невідома дата';
    }

    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('uk-UA', options);

    return formattedDate;
};