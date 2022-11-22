export const getMetaDescription = (text: string) => {

    let index = 155;

    // Break the text at the first space before 155 characters
    while(text[index] !== ' ' && index > 0) {
        index--;
    }

    // Get the slice of the text
    text = text.slice(0, index);

    // Remove dot at the end of the text
    if(text[text.length - 1] === '.') {
        text = text.slice(0, text.length - 1);
    }

    // Add the ellipsis
    text += '...';

    return text;    
}