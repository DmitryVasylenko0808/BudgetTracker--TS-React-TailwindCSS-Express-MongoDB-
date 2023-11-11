export const formatDate = (date: Date) => {
    let data: string | string[] = date.toString().split(/-|:|T/);
    let result: string = `${data[2]}-${data[1]}-${data[0]}`;

    return result;
}