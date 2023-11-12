import dayjs from 'dayjs'

enum Month {
    JAN = 1,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC,
}

const get_days_in_month = (month: Month, year: number = -1): number[] => {
    const month_with_31_days = [1, 3, 5, 7, 8, 10, 12]

    const days = month === 2 ?
        (is_leap_year(year) ? 29 : 28)
        :
        (month_with_31_days.includes(month) ? 31 : 30)

    return Array.from(Array(days).keys()).map(num => num + 1)
}

const is_leap_year = (year: number): boolean => {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))
        return true

    return false
}

const get_years_list = (
    gap: number,
    end_year: number = new Date().getFullYear()
): number[] => {
    const years_set: number[] = []

    for (let i = end_year - gap; i < end_year; i++) {
        years_set.push(i)
    }

    return years_set
}

const format_date_mysql = (year: number, month: number, day: number): string => {
    return dayjs(new Date(year, month - 1, day)).format('YYYY-MM-DD')
}

export {
    get_days_in_month,
    is_leap_year,
    get_years_list,
    format_date_mysql,
}