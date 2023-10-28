const formatDate = (inputDate:string) => {
    const date = new Date(inputDate);
    const dateArray = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).split(" ")
    return dateArray[0] + " " + dateArray[1] + ", " + dateArray[2]
}
export default formatDate;