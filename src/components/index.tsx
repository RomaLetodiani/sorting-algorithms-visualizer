import { useState } from 'react';

const SortVisualizer = () => {
  const initialArray = [3, 7, 11, 6, 5, 8, 4];
  const [array, setArray] = useState<number[]>(initialArray);

  const reset = () => {
    setArray(initialArray);
  };

  // Function to simulate swapping elements in an array
  const swap = (items: number[], leftIndex: number, rightIndex: number) => {
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    setArray([...items]);
  };

  // Function to perform Bubble Sort
  const bubbleSort = async () => {
    const len = array.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (array[i] > array[i + 1]) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
          swap(array, i, i + 1);
          swapped = true;
        }
      }
    } while (swapped);
  };

  const mergeSort = async () => {
    const merge = async (
      arr: number[],
      left: number,
      middle: number,
      right: number
    ) => {
      const leftArray = arr.slice(left, middle + 1);
      const rightArray = arr.slice(middle + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;
      while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
          arr[k++] = leftArray[i++];
        } else {
          await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
          arr[k++] = rightArray[j++];
        }
        setArray([...arr]);
      }
      while (i < leftArray.length) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
        arr[k++] = leftArray[i++];
        setArray([...arr]);
      }
      while (j < rightArray.length) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
        arr[k++] = rightArray[j++];
        setArray([...arr]);
      }
    };

    const mergeSortHelper = async (
      arr: number[],
      left: number,
      right: number
    ) => {
      if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, middle);
        await mergeSortHelper(arr, middle + 1, right);
        await merge(arr, left, middle, right);
      }
    };

    await mergeSortHelper(array, 0, array.length - 1);
  };

  const selectionSort = async () => {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (array[j] < array[min]) {
          min = j;
        }
      }
      if (min !== i) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
        swap(array, i, min);
      }
    }
  };

  const insertionSort = async () => {
    const len = array.length;
    for (let i = 1; i < len; i++) {
      const current = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
      setArray([...array]);
    }
  };

  const quickSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const pivotIndex = await partition(arr, left, right);
      await quickSort(arr, left, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, right);
    }
  };

  const partition = async (arr: number[], left: number, right: number) => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
        swap(arr, i, j);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
    swap(arr, i + 1, right);
    return i + 1;
  };

  const startQuickSort = async () => {
    const arrCopy = [...array];
    await quickSort(arrCopy, 0, arrCopy.length - 1);
  };

  return (
    <div>
      <button onClick={() => bubbleSort()}>Start Bubble Sort</button>
      <br />
      <button onClick={() => mergeSort()}>Start Merge Sort</button>
      <br />
      <button onClick={() => selectionSort()}>Start Selection Sort</button>
      <br />
      <button onClick={() => insertionSort()}>Start Insertion Sort</button>
      <br />
      <button onClick={() => startQuickSort()}>Start Quick Sort</button>
      <br />
      <button onClick={() => reset()}>reset</button>
      <div className="flex items-center gap-5">
        {array.map((value, idx) => (
          <div
            style={{ height: `${value * 15}px`, width: `${value * 15}px` }}
            className={`text-white m-1 bg-blue-500 rounded-full flex justify-center items-center`}
            key={idx}
          >
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortVisualizer;
