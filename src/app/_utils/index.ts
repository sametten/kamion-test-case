 // Libs
 import _ from 'lodash';
 import IMask from 'imask';
 import moment from 'moment';

/**
 * Pascal case formatter.
 * geeks-for-geeks -> GeeksForGeeks
 */

export const formatToPascalCase = (value: string): string => {
    return _.upperFirst(_.camelCase(value));
}

/**
 * Check email.
 * johndoe@gmail.com -> true
 */

export const checkEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Format to money
 */

export const formatToMoney = (value: string): string => {

    return Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(value);
}


/**
 * Format to phone number
 */

export const formatToPhoneNumber = (value: string): string => {

    const formatter = IMask.createMask({
        mask: '0 (000) 000 00 00',
    });

    formatter.resolve(value.slice(-11))

    return formatter.value;
}


/**
 * Format to date
 */

export const formatDate = (date: string): string => {
    return moment.unix(date).format('DD/MM/YYYY');
}

/**
 * Format to
 * @param value 5325605655 
 * @param mask (000) 000 00 00
 * @returns (532) 560 56 55
 */

export const formatTo = (value: string, mask: string): string => {
    const formatter = IMask.createMask({
        mask: mask,
    });

    formatter.resolve(value)

    return formatter.value;
}