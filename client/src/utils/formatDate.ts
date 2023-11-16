export const formatDate = (date: Date | string, reverse: boolean = false) => {
    const data: string | string[] = date.toString().split(/-|:|T/);
    let result: string;

    if (reverse) {
        result = `${data[0]}-${data[1]}-${data[2]}`;
    } else {
        result = `${data[2]}-${data[1]}-${data[0]}`;
    }

    return result;
}