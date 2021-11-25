import React from "react";
import { firstDate, lastDate } from "./dates";
export const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#142F43"];

const RADIAN = Math.PI / 180;
export const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export const individualCategoryTotal = (arr) => {
  let temp = 0;
  for (let j = 0; j < arr.length; j++) {
    temp += arr[j].amount;
  }
  return temp;
};

// Grouping based on category
let categoryGroupsArray;
export const categoryGrouping = (arr) => {
  const categoryGroup = arr.reduce((categoryGroup, item) => {
    const name = item.name.split("T")[0];
    if (!categoryGroup[name]) {
      categoryGroup[name] = [];
    }
    categoryGroup[name].push(item);
    return categoryGroup;
  }, {});

  categoryGroupsArray = Object.keys(categoryGroup).map((name) => {
    return {
      items: categoryGroup[name],
      name: categoryGroup[name][0].name,
      total: individualCategoryTotal(categoryGroup[name]),
    };
  });

  return categoryGroupsArray;
};

// Grouping based on date
let dateGroupsArray;
export const dateGrouping = (arr) => {
  const dateGroup = arr.reduce((dateGroup, item) => {
    const date = item.date.split("T")[0];
    if (!dateGroup[date]) {
      dateGroup[date] = [];
    }
    dateGroup[date].push(item);
    return dateGroup;
  }, {});

  dateGroupsArray = Object.keys(dateGroup).map((date) => {
    return {
      date,
      items: dateGroup[date],
      total: individualCategoryTotal(dateGroup[date]),
    };
  });

  return dateGroupsArray;
};

// Sorting data based on date
// const sortType = 'asc';
// const sorted = transactions.sort((a, b) => {
//     const isSorted = (sortType === 'asc') ? 1 : -1
//     return isSorted * b.date.localeCompare(a.date)
// })
// Filter Data Based on Date

// (YESTERDAY COMPONENT )
let temp = [];
export const filterDataBasedOnDate = (arr, date) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].date === date) {
      temp = arr[i].items;
    }
  }
  return temp;
};

// (LAST MONTH COMPONENT )
export const filterDataBasedOnDates = (arr) => {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].items.length; j++) {
      if (
        arr[i].items[j].date >= firstDate &&
        arr[i].items[j].date <= lastDate
      ) {
        temp.push(arr[i].items[j]);
      }
    }
  }
  return temp;
};

// Calculating the Income and Expense
let amount;
export const clacAmount = (arr) => {
  amount = arr.map((transaction) => transaction.amount);
  return amount;
};
export const calcExpenses = (amount) => {
  return amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
};
export const calAllExpenses = (amount) => {
  return (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
};
export const calcIncome = (amount) => {
  return amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
};
