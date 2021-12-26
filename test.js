function isIncluded(arr1,arr2) {
    //takes a 2d array and a 1d array to check if the second array is inside the first.
    let result = false
    for(let arr of arr1){
        let isFound = true
        for(let idx in arr2){
            if(arr[idx] !== arr2[idx]) isFound = false
        }
        if(isFound){
            result = true
            break
        }
    }
    return result
}
let arr1 = [[1,2],[3,4],[5,6]]
let arr2 = [1,2]
console.log(isIncluded(arr1,arr2))