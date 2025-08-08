import { p as proxyCustomElement, H, c as createEvent, h } from './p-B4rZamdt.js';
import { c as classNames } from './p-GRXVFTDh.js';
import { a as autoUpdate, c as computePosition, o as offset, f as flip, s as shift } from './p-B0XocndT.js';
import { g as getIconElementProps } from './p-DwXIfk8y.js';
import { d as defineCustomElement$6 } from './p-D_-4qiry.js';
import { d as defineCustomElement$5 } from './p-r58Qbyxv.js';
import { d as defineCustomElement$4 } from './p-DrRHtkyE.js';
import { d as defineCustomElement$3 } from './p-BIahD9g3.js';
import { d as defineCustomElement$2 } from './p-Dz92n4WS.js';

/**
 * Default list of countries with their dialing codes and masks
 * Used when no custom country list is provided
 */
const INTERNAL_COUNTRIES = [
  { label: 'Afghanistan', id: 'AF', dialCode: '+93', mask: '999 99 999 9999' },
  { label: 'Albania', id: 'AL', dialCode: '+355', mask: '999 999 999' },
  { label: 'Algeria', id: 'DZ', dialCode: '+213', mask: '99 999 99 99' },
  { label: 'American Samoa', id: 'AS', dialCode: '+1684', mask: '(999) 999-9999' },
  { label: 'Andorra', id: 'AD', dialCode: '+376', mask: '999 999' },
  { label: 'Angola', id: 'AO', dialCode: '+244', mask: '999 999 999' },
  { label: 'Anguilla', id: 'AI', dialCode: '+1264', mask: '(999) 999-9999' },
  { label: 'Antarctica', id: 'AQ', dialCode: '+672', mask: '99 999999' },
  { label: 'Antigua and Barbuda', id: 'AG', dialCode: '+1268', mask: '(999) 999-9999' },
  { label: 'Argentina', id: 'AR', dialCode: '+54', mask: '(999) 9999-9999' },
  { label: 'Armenia', id: 'AM', dialCode: '+374', mask: '99 999-9999' },
  { label: 'Aruba', id: 'AW', dialCode: '+297', mask: '999 9999' },
  { label: 'Australia', id: 'AU', dialCode: '+61', mask: '(99) 9999 9999' },
  { label: 'Austria', id: 'AT', dialCode: '+43', mask: '9999 99999999' },
  { label: 'Azerbaijan', id: 'AZ', dialCode: '+994', mask: '99 999 99 99' },
  { label: 'Bahamas', id: 'BS', dialCode: '+1242', mask: '(999) 999-9999' },
  { label: 'Bahrain', id: 'BH', dialCode: '+973', mask: '9999 9999' },
  { label: 'Bangladesh', id: 'BD', dialCode: '+880', mask: '9999-999999' },
  { label: 'Barbados', id: 'BB', dialCode: '+1246', mask: '(999) 999-9999' },
  { label: 'Belarus', id: 'BY', dialCode: '+375', mask: '(99) 999-99-99' },
  { label: 'Belgium', id: 'BE', dialCode: '+32', mask: '999 99 99 99' },
  { label: 'Belize', id: 'BZ', dialCode: '+501', mask: '999-9999' },
  { label: 'Benin', id: 'BJ', dialCode: '+229', mask: '99 99 99 99' },
  { label: 'Bermuda', id: 'BM', dialCode: '+1441', mask: '(999) 999-9999' },
  { label: 'Bhutan', id: 'BT', dialCode: '+975', mask: '99 999 999' },
  { label: 'Bolivia', id: 'BO', dialCode: '+591', mask: '99999999' },
  { label: 'Bosnia and Herzegovina', id: 'BA', dialCode: '+387', mask: '99 999-999' },
  { label: 'Botswana', id: 'BW', dialCode: '+267', mask: '99 999 999' },
  { label: 'Bouvet Island', id: 'BV', dialCode: '+47', mask: '999 99 999' },
  { label: 'Brazil', id: 'BR', dialCode: '+55', mask: '(99) 99999-9999' },
  { label: 'British Indian Ocean Territory', id: 'IO', dialCode: '+246', mask: '999 9999' },
  { label: 'Brunei Darussalam', id: 'BN', dialCode: '+673', mask: '999-9999' },
  { label: 'Bulgaria', id: 'BG', dialCode: '+359', mask: '99 999 999' },
  { label: 'Burkina Faso', id: 'BF', dialCode: '+226', mask: '99 99 99 99' },
  { label: 'Burundi', id: 'BI', dialCode: '+257', mask: '99 99 9999' },
  { label: 'Cambodia', id: 'KH', dialCode: '+855', mask: '99 999 999' },
  { label: 'Cameroon', id: 'CM', dialCode: '+237', mask: '9999 9999' },
  { label: 'Canada', id: 'CA', dialCode: '+1', mask: '(999) 999-9999' },
  { label: 'Cape Verde', id: 'CV', dialCode: '+238', mask: '999 99 99' },
  { label: 'Cayman Islands', id: 'KY', dialCode: '+1345', mask: '(999) 999-9999' },
  { label: 'Central African Republic', id: 'CF', dialCode: '+236', mask: '99 99 99 99' },
  { label: 'Chad', id: 'TD', dialCode: '+235', mask: '99 99 99 99' },
  { label: 'Chile', id: 'CL', dialCode: '+56', mask: '9 9999 9999' },
  { label: 'China', id: 'CN', dialCode: '+86', mask: '999-99999999' },
  { label: 'Christmas Island', id: 'CX', dialCode: '+61', mask: '(99) 9999 9999' },
  { label: 'Cocos (Keeling) Islands', id: 'CC', dialCode: '+61', mask: '(99) 9999 9999' },
  { label: 'Colombia', id: 'CO', dialCode: '+57', mask: '999 999 9999' },
  { label: 'Comoros', id: 'KM', dialCode: '+269', mask: '99 99999' },
  { label: 'Congo', id: 'CG', dialCode: '+242', mask: '99 999 9999' },
  { label: 'Congo, The Democratic Republic of the', id: 'CD', dialCode: '+243', mask: '99 999 9999' },
  { label: 'Cook Islands', id: 'CK', dialCode: '+682', mask: '99 999' },
  { label: 'Costa Rica', id: 'CR', dialCode: '+506', mask: '9999-9999' },
  { label: 'Cote D"Ivoire', id: 'CI', dialCode: '+225', mask: '99 99 99 99' },
  { label: 'Croatia', id: 'HR', dialCode: '+385', mask: '99 999 9999' },
  { label: 'Cuba', id: 'CU', dialCode: '+53', mask: '9 9999999' },
  { label: 'Cyprus', id: 'CY', dialCode: '+357', mask: '99 999 999' },
  { label: 'Czech Republic', id: 'CZ', dialCode: '+420', mask: '999 999 999' },
  { label: 'Denmark', id: 'DK', dialCode: '+45', mask: '99 99 99 99' },
  { label: 'Djibouti', id: 'DJ', dialCode: '+253', mask: '99 99 99 99' },
  { label: 'Dominica', id: 'DM', dialCode: '+1767', mask: '(999) 999-9999' },
  { label: 'Dominican Republic', id: 'DO', dialCode: '+1', mask: '(999) 999-9999' },
  { label: 'Ecuador', id: 'EC', dialCode: '+593', mask: '99 999-9999' },
  { label: 'Egypt', id: 'EG', dialCode: '+20', mask: '999 999 9999' },
  { label: 'El Salvador', id: 'SV', dialCode: '+503', mask: '9999-9999' },
  { label: 'Equatorial Guinea', id: 'GQ', dialCode: '+240', mask: '99 999 9999' },
  { label: 'Eritrea', id: 'ER', dialCode: '+291', mask: '9 999 999' },
  { label: 'Estonia', id: 'EE', dialCode: '+372', mask: '9999 9999' },
  { label: 'Ethiopia', id: 'ET', dialCode: '+251', mask: '99 999 9999' },
  { label: 'Falkland Islands (Malvinas)', id: 'FK', dialCode: '+500', mask: '99999' },
  { label: 'Faroe Islands', id: 'FO', dialCode: '+298', mask: '999999' },
  { label: 'Fiji', id: 'FJ', dialCode: '+679', mask: '99 99999' },
  { label: 'Finland', id: 'FI', dialCode: '+358', mask: '99 999 99 99' },
  { label: 'France', id: 'FR', dialCode: '+33', mask: '9 99 99 99 99' },
  { label: 'French Guiana', id: 'GF', dialCode: '+594', mask: '99999-9999' },
  { label: 'French Polynesia', id: 'PF', dialCode: '+689', mask: '99 99 99' },
  { label: 'French Southern Territories', id: 'TF', dialCode: '+262', mask: '99999-9999' },
  { label: 'Gabon', id: 'GA', dialCode: '+241', mask: '9 99 99 99' },
  { label: 'Gambia', id: 'GM', dialCode: '+220', mask: '999-9999' },
  { label: 'Georgia', id: 'GE', dialCode: '+995', mask: '999 99 99 99' },
  { label: 'Germany', id: 'DE', dialCode: '+49', mask: '9999 99999999' },
  { label: 'Ghana', id: 'GH', dialCode: '+233', mask: '99 999 9999' },
  { label: 'Gibraltar', id: 'GI', dialCode: '+350', mask: '999 99999' },
  { label: 'Greece', id: 'GR', dialCode: '+30', mask: '999 999 9999' },
  { label: 'Greenland', id: 'GL', dialCode: '+299', mask: '99 99 99' },
  { label: 'Grenada', id: 'GD', dialCode: '+1473', mask: '(999) 999-9999' },
  { label: 'Guadeloupe', id: 'GP', dialCode: '+590', mask: '999999999' },
  { label: 'Guam', id: 'GU', dialCode: '+1671', mask: '(999) 999-9999' },
  { label: 'Guatemala', id: 'GT', dialCode: '+502', mask: '9999-9999' },
  { label: 'Guernsey', id: 'GG', dialCode: '+44', mask: '99999 999999' },
  { label: 'Guinea', id: 'GN', dialCode: '+224', mask: '99 999 999' },
  { label: 'Guinea-Bissau', id: 'GW', dialCode: '+245', mask: '9 999999' },
  { label: 'Guyana', id: 'GY', dialCode: '+592', mask: '999-9999' },
  { label: 'Haiti', id: 'HT', dialCode: '+509', mask: '99 99-9999' },
  { label: 'Heard Island and Mcdonald Islands', id: 'HM', dialCode: '+672', mask: '' },
  { label: 'Holy See (Vatican City State)', id: 'VA', dialCode: '+39', mask: '99 9999 9999' },
  { label: 'Honduras', id: 'HN', dialCode: '+504', mask: '9999-9999' },
  { label: 'Hong Kong', id: 'HK', dialCode: '+852', mask: '9999 9999' },
  { label: 'Hungary', id: 'HU', dialCode: '+36', mask: '(99) 999-9999' },
  { label: 'Iceland', id: 'IS', dialCode: '+354', mask: '999-9999' },
  { label: 'India', id: 'IN', dialCode: '+91', mask: '99999-99999' },
  { label: 'Indonesia', id: 'ID', dialCode: '+62', mask: '999-9999-9999' },
  { label: 'Iran, Islamic Republic Of', id: 'IR', dialCode: '+98', mask: '999 999 9999' },
  { label: 'Iraq', id: 'IQ', dialCode: '+964', mask: '999 999 9999' },
  { label: 'Ireland', id: 'IE', dialCode: '+353', mask: '99 999 9999' },
  { label: 'Isle of Man', id: 'IM', dialCode: '+44', mask: '99999 999999' },
  { label: 'Israel', id: 'IL', dialCode: '+972', mask: '999 999-9999' },
  { label: 'Italy', id: 'IT', dialCode: '+39', mask: '999 9999 9999' },
  { label: 'Jamaica', id: 'JM', dialCode: '+1876', mask: '(999) 999-9999' },
  { label: 'Japan', id: 'JP', dialCode: '+81', mask: '99-9999-9999' },
  { label: 'Jersey', id: 'JE', dialCode: '+44', mask: '99999 999999' },
  { label: 'Jordan', id: 'JO', dialCode: '+962', mask: '9 9999-9999' },
  { label: 'Kazakhstan', id: 'KZ', dialCode: '+7', mask: '(999) 999-99-99' },
  { label: 'Kenya', id: 'KE', dialCode: '+254', mask: '999 999999' },
  { label: 'Kiribati', id: 'KI', dialCode: '+686', mask: '99 999' },
  { label: 'Korea, Democratic People"S Republic of', id: 'KP', dialCode: '+850', mask: '999 999-9999' },
  { label: 'Korea, Republic of', id: 'KR', dialCode: '+82', mask: '999-9999-9999' },
  { label: 'Kuwait', id: 'KW', dialCode: '+965', mask: '9999 9999' },
  { label: 'Kyrgyzstan', id: 'KG', dialCode: '+996', mask: '999 999-9999' },
  { label: 'Lao People"S Democratic Republic', id: 'LA', dialCode: '+856', mask: '99 999 999' },
  { label: 'Latvia', id: 'LV', dialCode: '+371', mask: '99 999 999' },
  { label: 'Lebanon', id: 'LB', dialCode: '+961', mask: '99 999 999' },
  { label: 'Lesotho', id: 'LS', dialCode: '+266', mask: '99 999 999' },
  { label: 'Liberia', id: 'LR', dialCode: '+231', mask: '99 999 999' },
  { label: 'Libyan Arab Jamahiriya', id: 'LY', dialCode: '+218', mask: '99-9999999' },
  { label: 'Liechtenstein', id: 'LI', dialCode: '+423', mask: '999 99 99' },
  { label: 'Lithuania', id: 'LT', dialCode: '+370', mask: '(999) 99999' },
  { label: 'Luxembourg', id: 'LU', dialCode: '+352', mask: '999 99 99 99' },
  { label: 'Macao', id: 'MO', dialCode: '+853', mask: '9999 9999' },
  { label: 'Macedonia, The Former Yugoslav Republic of', id: 'MK', dialCode: '+389', mask: '99 999 999' },
  { label: 'Madagascar', id: 'MG', dialCode: '+261', mask: '99 99 999 99' },
  { label: 'Malawi', id: 'MW', dialCode: '+265', mask: '9 9999 9999' },
  { label: 'Malaysia', id: 'MY', dialCode: '+60', mask: '99-9999-9999' },
  { label: 'Maldives', id: 'MV', dialCode: '+960', mask: '999-9999' },
  { label: 'Mali', id: 'ML', dialCode: '+223', mask: '99 99 99 99' },
  { label: 'Malta', id: 'MT', dialCode: '+356', mask: '9999 9999' },
  { label: 'Marshall Islands', id: 'MH', dialCode: '+692', mask: '999-9999' },
  { label: 'Martinique', id: 'MQ', dialCode: '+596', mask: '999999999' },
  { label: 'Mauritania', id: 'MR', dialCode: '+222', mask: '99 99 99 99' },
  { label: 'Mauritius', id: 'MU', dialCode: '+230', mask: '9999-9999' },
  { label: 'Mayotte', id: 'YT', dialCode: '+262', mask: '99999-9999' },
  { label: 'Mexico', id: 'MX', dialCode: '+52', mask: '999 999 9999' },
  { label: 'Micronesia, Federated States of', id: 'FM', dialCode: '+691', mask: '999-9999' },
  { label: 'Moldova, Republic of', id: 'MD', dialCode: '+373', mask: '9999 99999' },
  { label: 'Monaco', id: 'MC', dialCode: '+377', mask: '99 99 99 99' },
  { label: 'Mongolia', id: 'MN', dialCode: '+976', mask: '9999-9999' },
  { label: 'Montserrat', id: 'MS', dialCode: '+1664', mask: '(999) 999-9999' },
  { label: 'Morocco', id: 'MA', dialCode: '+212', mask: '99-9999999' },
  { label: 'Mozambique', id: 'MZ', dialCode: '+258', mask: '99 999 9999' },
  { label: 'Myanmar', id: 'MM', dialCode: '+95', mask: '99 999 9999' },
  { label: 'Namibia', id: 'NA', dialCode: '+264', mask: '99 999 9999' },
  { label: 'Nauru', id: 'NR', dialCode: '+674', mask: '999-9999' },
  { label: 'Nepal', id: 'NP', dialCode: '+977', mask: '999-9999999' },
  { label: 'Netherlands', id: 'NL', dialCode: '+31', mask: '9 99999999' },
  { label: 'Netherlands Antilles', id: 'AN', dialCode: '+599', mask: '999 9999' },
  { label: 'New Caledonia', id: 'NC', dialCode: '+687', mask: '999999' },
  { label: 'New Zealand', id: 'NZ', dialCode: '+64', mask: '999 999 9999' },
  { label: 'Nicaragua', id: 'NI', dialCode: '+505', mask: '9999-9999' },
  { label: 'Niger', id: 'NE', dialCode: '+227', mask: '99 99 99 99' },
  { label: 'Nigeria', id: 'NG', dialCode: '+234', mask: '999 999 9999' },
  { label: 'Niue', id: 'NU', dialCode: '+683', mask: '9999' },
  { label: 'Norfolk Island', id: 'NF', dialCode: '+672', mask: '999999' },
  { label: 'Northern Mariana Islands', id: 'MP', dialCode: '+1670', mask: '(999) 999-9999' },
  { label: 'Norway', id: 'NO', dialCode: '+47', mask: '999 99 999' },
  { label: 'Oman', id: 'OM', dialCode: '+968', mask: '9999 9999' },
  { label: 'Pakistan', id: 'PK', dialCode: '+92', mask: '999-9999999' },
  { label: 'Palau', id: 'PW', dialCode: '+680', mask: '999-9999' },
  { label: 'Palestinian Territory, Occupied', id: 'PS', dialCode: '+970', mask: '99 999-9999' },
  { label: 'Panama', id: 'PA', dialCode: '+507', mask: '9999-9999' },
  { label: 'Papua New Guinea', id: 'PG', dialCode: '+675', mask: '999-9999' },
  { label: 'Paraguay', id: 'PY', dialCode: '+595', mask: '999 999-9999' },
  { label: 'Peru', id: 'PE', dialCode: '+51', mask: '999 999 999' },
  { label: 'Philippines', id: 'PH', dialCode: '+63', mask: '9999 9999999' },
  { label: 'Pitcairn', id: 'PN', dialCode: '+64', mask: '99999999' },
  { label: 'Poland', id: 'PL', dialCode: '+48', mask: '999-999-999' },
  { label: 'Portugal', id: 'PT', dialCode: '+351', mask: '999 999 999' },
  { label: 'Puerto Rico', id: 'PR', dialCode: '+1', mask: '(999) 999-9999' },
  { label: 'Qatar', id: 'QA', dialCode: '+974', mask: '9999 9999' },
  { label: 'Reunion', id: 'RE', dialCode: '+262', mask: '99999-9999' },
  { label: 'Romania', id: 'RO', dialCode: '+40', mask: '99 999-9999' },
  { label: 'Russian Federation', id: 'RU', dialCode: '+7', mask: '(999) 999-9999' },
  { label: 'RWANDA', id: 'RW', dialCode: '+250', mask: '999 999 999' },
  { label: 'Saint Helena', id: 'SH', dialCode: '+290', mask: '99999' },
  { label: 'Saint Kitts and Nevis', id: 'KN', dialCode: '+1869', mask: '(999) 999-9999' },
  { label: 'Saint Lucia', id: 'LC', dialCode: '+1758', mask: '(999) 999-9999' },
  { label: 'Saint Pierre and Miquelon', id: 'PM', dialCode: '+508', mask: '99-9999' },
  { label: 'Saint Vincent and the Grenadines', id: 'VC', dialCode: '+1784', mask: '(999) 999-9999' },
  { label: 'Samoa', id: 'WS', dialCode: '+685', mask: '99-9999' },
  { label: 'San Marino', id: 'SM', dialCode: '+378', mask: '9999 999999' },
  { label: 'Sao Tome and Principe', id: 'ST', dialCode: '+239', mask: '9 999999' },
  { label: 'Saudi Arabia', id: 'SA', dialCode: '+966', mask: '99 999 9999' },
  { label: 'Senegal', id: 'SN', dialCode: '+221', mask: '99 999 99 99' },
  { label: 'Serbia and Montenegro', id: 'CS', dialCode: '+381', mask: '99 999-9999' },
  { label: 'Seychelles', id: 'SC', dialCode: '+248', mask: '9 999 999' },
  { label: 'Sierra Leone', id: 'SL', dialCode: '+232', mask: '99 999999' },
  { label: 'Singapore', id: 'SG', dialCode: '+65', mask: '9999 9999' },
  { label: 'Slovakia', id: 'SK', dialCode: '+421', mask: '999 999 999' },
  { label: 'Slovenia', id: 'SI', dialCode: '+386', mask: '99 999 999' },
  { label: 'Solomon Islands', id: 'SB', dialCode: '+677', mask: '99999' },
  { label: 'Somalia', id: 'SO', dialCode: '+252', mask: '99 999-99' },
  { label: 'South Africa', id: 'ZA', dialCode: '+27', mask: '99 999 9999' },
  { label: 'South Georgia and the South Sandwich Islands', id: 'GS', dialCode: '+500', mask: '99999' },
  { label: 'Spain', id: 'ES', dialCode: '+34', mask: '999 99 99 99' },
  { label: 'Sri Lanka', id: 'LK', dialCode: '+94', mask: '99 999 9999' },
  { label: 'Sudan', id: 'SD', dialCode: '+249', mask: '99 999-9999' },
  { label: 'Surilabel', id: 'SR', dialCode: '+597', mask: '999-9999' },
  { label: 'Svalbard and Jan Mayen', id: 'SJ', dialCode: '+47', mask: '999 99 999' },
  { label: 'Swaziland', id: 'SZ', dialCode: '+268', mask: '99 99 9999' },
  { label: 'Sweden', id: 'SE', dialCode: '+46', mask: '99-9999999' },
  { label: 'Switzerland', id: 'CH', dialCode: '+41', mask: '99 999 99 99' },
  { label: 'Syrian Arab Republic', id: 'SY', dialCode: '+963', mask: '99 9999-9999' },
  { label: 'Taiwan, Province of China', id: 'TW', dialCode: '+886', mask: '9999-9999' },
  { label: 'Tajikistan', id: 'TJ', dialCode: '+992', mask: '99 999-9999' },
  { label: 'Tanzania, United Republic of', id: 'TZ', dialCode: '+255', mask: '99 999 9999' },
  { label: 'Thailand', id: 'TH', dialCode: '+66', mask: '99 999 9999' },
  { label: 'Timor-Leste', id: 'TL', dialCode: '+670', mask: '999-9999' },
  { label: 'Togo', id: 'TG', dialCode: '+228', mask: '99 99 99 99' },
  { label: 'Tokelau', id: 'TK', dialCode: '+690', mask: '9999' },
  { label: 'Tonga', id: 'TO', dialCode: '+676', mask: '99999' },
  { label: 'Trinidad and Tobago', id: 'TT', dialCode: '+1868', mask: '(999) 999-9999' },
  { label: 'Tunisia', id: 'TN', dialCode: '+216', mask: '99 999 999' },
  { label: 'Turkey', id: 'TR', dialCode: '+90', mask: '(999) 999 9999' },
  { label: 'Turkmenistan', id: 'TM', dialCode: '+993', mask: '99 999999' },
  { label: 'Turks and Caicos Islands', id: 'TC', dialCode: '+1649', mask: '(999) 999-9999' },
  { label: 'Tuvalu', id: 'TV', dialCode: '+688', mask: '99999' },
  { label: 'Uganda', id: 'UG', dialCode: '+256', mask: '99 999-9999' },
  { label: 'Ukraine', id: 'UA', dialCode: '+380', mask: '(99) 999 99 99' },
  { label: 'United Arab Emirates', id: 'AE', dialCode: '+971', mask: '99 999 9999' },
  { label: 'United Kingdom', id: 'GB', dialCode: '+44', mask: '9999 999999' },
  { label: 'United States', id: 'US', dialCode: '+1', mask: '(999) 999-9999' },
  { label: 'United States Minor Outlying Islands', id: 'UM', dialCode: '+1', mask: '(999) 999-9999' },
  { label: 'Uruguay', id: 'UY', dialCode: '+598', mask: '9999 9999' },
  { label: 'Uzbekistan', id: 'UZ', dialCode: '+998', mask: '99 999-9999' },
  { label: 'Vanuatu', id: 'VU', dialCode: '+678', mask: '99999' },
  { label: 'Venezuela', id: 'VE', dialCode: '+58', mask: '999-9999999' },
  { label: 'Viet Nam', id: 'VN', dialCode: '+84', mask: '999 99 99-99' },
  { label: 'Virgin Islands, British', id: 'VG', dialCode: '+1284', mask: '(999) 999-9999' },
  { label: 'Virgin Islands, U.S.', id: 'VI', dialCode: '+1340', mask: '(999) 999-9999' },
  { label: 'Wallis and Futuna', id: 'WF', dialCode: '+681', mask: '99-9999' },
  { label: 'Western Sahara', id: 'EH', dialCode: '+212', mask: '99-9999999' },
  { label: 'Yemen', id: 'YE', dialCode: '+967', mask: '999 999 999' },
  { label: 'Zambia', id: 'ZM', dialCode: '+260', mask: '99-9999999' },
  { label: 'Zimbabwe', id: 'ZW', dialCode: '+263', mask: '99 999-9999' },
];

const tkPhoneInputScss =
  ":host {\n  display: block;\n}\n\n.tk-phone-input {\n  display: flex;\n  flex-direction: column;\n  gap: var(--input-external-label-large-container-gap);\n  box-sizing: border-box;\n\n  &[aria-invalid] {\n    & .tk-phone-input__wrapper {\n      border-color: var(--states-danger-base);\n    }\n\n    & .tk-phone-input__hint-text {\n      color: var(--states-danger-base);\n    }\n    & .tk-phone-input__hint i {\n      color: var(--states-danger-base);\n    }\n  }\n\n  &[aria-disabled] {\n    & .tk-phone-input__wrapper {\n      background-color: var(--background-lightest);\n      border-color: var(--border-light);\n    }\n\n    & .tk-phone-input__label,\n    & .tk-phone-input__hint-text {\n      color: var(--text-sub-base);\n      pointer-events: none;\n    }\n\n    & .tk-phone-input__input,\n    & .tk-phone-input__dropdown-button {\n      color: var(--text-sub-base);\n      pointer-events: none;\n\n      &::placeholder {\n        color: var(--text-sub-base);\n      }\n    }\n  }\n\n  &[aria-readonly] {\n    & .tk-phone-input__wrapper {\n      background-color: var(--background-lightest);\n      border-color: var(--border-light);\n    }\n\n    & .tk-phone-input__label,\n    & .tk-phone-input__hint-text {\n      color: var(--text-sub-base);\n    }\n\n    & .tk-phone-input__input,\n    & .tk-phone-input__dropdown-button {\n      color: var(--text-darkest);\n      pointer-events: none;\n\n      &::placeholder {\n        color: var(--text-darkest);\n      }\n    }\n  }\n\n  &--large {\n    .tk-phone-input__wrapper {\n      height: var(--spacing-12xl);\n      padding: var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding);\n    }\n\n    .tk-phone-input__label {\n      font-size: var(--desktop-label-l-size);\n      line-height: var(--desktop-label-l-line-height);\n      padding: var(--input-external-label-large-label-v-padding) var(--input-external-label-large-label-h-padding);\n    }\n\n    .tk-phone-input__label-title {\n      font-size: var(--desktop-label-l-size);\n      line-height: var(--desktop-label-l-line-height);\n    }\n\n    .tk-phone-input__dropdown-menu {\n      top: var(--spacing-12xl);\n    }\n\n    .tk-phone-input__dropdown-menu-list-item {\n      font-size: var(--desktop-label-l-size);\n      line-height: var(--desktop-label-l-line-height);\n    }\n  }\n  &--base {\n    .tk-phone-input__wrapper {\n      height: var(--spacing-10xl);\n      padding: var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding);\n    }\n\n    .tk-phone-input__label {\n      font-size: var(--desktop-label-m-base-size);\n      line-height: var(--desktop-label-m-base-line-height);\n      padding: var(--input-external-label-base-label-v-padding) var(--input-external-label-base-label-h-padding);\n    }\n\n    .tk-phone-input__label-title {\n      font-size: var(--desktop-label-m-base-size);\n      line-height: var(--desktop-label-m-base-line-height);\n    }\n\n    .tk-phone-input__dropdown-menu {\n      top: var(--spacing-10xl);\n    }\n\n    .tk-phone-input__dropdown-menu-list-item {\n      font-size: var(--desktop-label-m-base-size);\n      line-height: var(--desktop-label-m-base-line-height);\n    }\n  }\n  &--small {\n    .tk-phone-input__wrapper {\n      height: var(--spacing-8xl);\n      padding: var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding);\n    }\n\n    .tk-phone-input__label {\n      font-size: var(--desktop-label-s-size);\n      line-height: var(--desktop-label-s-line-height);\n      padding: var(--input-external-label-small-label-v-padding) var(--input-external-label-small-label-h-padding);\n    }\n\n    .tk-phone-input__label-title {\n      font-size: var(--desktop-label-s-size);\n      line-height: var(--desktop-label-s-line-height);\n    }\n\n    .tk-phone-input__dropdown-menu {\n      top: var(--spacing-8xl);\n    }\n\n    .tk-phone-input__dropdown-menu-list-item {\n      font-size: var(--desktop-label-s-size);\n      line-height: var(--desktop-label-s-line-height);\n    }\n  }\n\n  &__label {\n    display: flex;\n    align-items: flex-start;\n    box-sizing: border-box;\n\n    &-title {\n      color: var(--text-darkest);\n      font-family: var(--desktop-label-s-font, 'Georgia');\n      font-weight: var(--weight-medium);\n    }\n    &-red-asterisk {\n      color: var(--states-danger-base);\n      font-size: var(--desktop-label-m-base-size);\n      font-weight: var(--weight-regular);\n      line-height: var(--desktop-label-s-line-height);\n    }\n  }\n\n  &__wrapper {\n    box-sizing: border-box;\n    position: relative;\n    display: flex;\n    width: -webkit-fill-available;\n    color: var(--text-darkest);\n    font-family: var(--desktop-label-s-font, 'Georgia');\n    border-radius: var(--button-sizes-large-radius);\n    border: var(--spacing-px) solid var(--border-light);\n    background: var(--static-light);\n\n    &--focus {\n      border: var(--spacing-px) solid var(--states-info-base);\n    }\n\n    &:hover {\n      background-color: var(--background-lightest);\n    }\n  }\n\n  &__dropdown {\n    box-sizing: border-box;\n\n    &-button {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      width: max-content;\n      height: 100%;\n      border: none;\n      font-family: var(--desktop-label-s-font, 'Georgia');\n      font-size: var(--desktop-label-l-size);\n      font-weight: var(--weight-medium);\n      color: var(--text-darkest);\n      background-color: transparent;\n      padding-right: var(--input-external-label-large-label-h-padding);\n\n      &-selected {\n        display: flex;\n        align-items: center;\n        gap: var(--spacing-xs);\n        border-right: var(--spacing-px) solid var(--border-light);\n      }\n      &-dial-code {\n        padding-right: var(--input-external-label-large-label-h-padding);\n      }\n    }\n\n    &-menu {\n      position: absolute;\n      left: var(--spacing-none);\n      z-index: 10;\n      background: var(--static-light);\n      border: var(--spacing-px) solid var(--border-light);\n      border-radius: var(--button-sizes-large-radius);\n      box-shadow: var(--effect-1-default-sm);\n      width: var(--spacing-80xl);\n      display: flex;\n      flex-direction: column;\n\n      &-search {\n        padding: var(--spacing-m-base);\n      }\n\n      &-list {\n        list-style: none;\n        padding: var(--spacing-none);\n        margin: var(--spacing-none) var(--spacing-m-base) var(--spacing-none) var(--spacing-none);\n        max-height: var(--spacing-56xl);\n        overflow-y: auto;\n\n        &-item {\n          display: flex;\n          align-items: center;\n          gap: var(--spacing-xs);\n          padding: var(--input-external-label-base-input-v-padding) var(--spacing-4xl);\n          cursor: pointer;\n          transition: background-color 0.2s;\n          font-family: var(--desktop-label-s-font, 'Georgia');\n\n          &:hover {\n            background-color: var(--background-lightest);\n          }\n\n          &-country-label {\n            flex-grow: 1;\n            white-space: nowrap;\n            color: var(--text-darkest);\n            font-size: var(--size-sm);\n          }\n\n          &-dial-id {\n            color: var(--text-darkest);\n            font-size: var(--desktop-label-m-base-size);\n          }\n        }\n\n        /* width */\n        &::-webkit-scrollbar {\n          width: var(--spacing-l);\n        }\n\n        /* Track */\n        &::-webkit-scrollbar-track {\n          background: var(--background-lightest);\n          border-radius: var(--radius-m-base);\n        }\n\n        /* Handle */\n        &::-webkit-scrollbar-thumb {\n          background: var(--secondary-300);\n          border-radius: var(--radius-m-base);\n        }\n\n        /* Handle on hover */\n        &::-webkit-scrollbar-thumb:hover {\n          background: var(--secondary-400);\n        }\n      }\n    }\n  }\n\n  &__input {\n    border: none;\n    font-family: var(--desktop-label-s-font, 'Georgia');\n    font-size: var(--desktop-label-l-size);\n    font-weight: var(--weight-medium);\n    background-color: transparent;\n    outline: none;\n    color: var(--text-darkest);\n    width: inherit;\n\n    &::placeholder {\n      color: var(--text-sub-base);\n    }\n  }\n\n  &__hint {\n    color: var(--text-base);\n    line-height: var(--desktop-label-s-line-height);\n    font-size: var(--desktop-label-s-size);\n    font-weight: 300;\n    display: flex;\n    align-items: center;\n    gap: var(--spacing-m-base);\n\n    &-icon {\n      font-size: var(--size-base);\n      width: var(--size-base);\n      height: var(--size-base);\n      color: var(--icon-base);\n    }\n  }\n}\n";

const flagScss =
  'span.flag{width:44px;height:30px;display:inline-block}img.flag{width:20px;height:20px;border-radius:100%;background-position-x:45%}.flag{background:url(https://primefaces.org/cdn/primevue/images/flag/flags_responsive.png) no-repeat;background-size:150%;vertical-align:middle}.flag-ad{background-position-y:0.413223%}.flag-ae{background-position-y:0.826446%}.flag-af{background-position-y:1.239669%}.flag-ag{background-position-y:1.652893%}.flag-ai{background-position-y:2.066116%}.flag-al{background-position-y:2.479339%}.flag-am{background-position-y:2.892562%}.flag-an{background-position-y:3.305785%}.flag-ao{background-position-y:3.719008%}.flag-aq{background-position-y:4.132231%}.flag-ar{background-position-y:4.545455%}.flag-as{background-position-y:4.958678%}.flag-at{background-position-y:5.371901%}.flag-au{background-position-y:5.785124%}.flag-aw{background-position-y:6.198347%}.flag-az{background-position-y:6.61157%}.flag-ba{background-position-y:7.024793%}.flag-bb{background-position-y:7.438017%}.flag-bd{background-position-y:7.85124%}.flag-be{background-position-y:8.264463%}.flag-bf{background-position-y:8.677686%}.flag-bg{background-position-y:9.090909%}.flag-bh{background-position-y:9.504132%}.flag-bi{background-position-y:9.917355%}.flag-bj{background-position-y:10.330579%}.flag-bm{background-position-y:10.743802%}.flag-bn{background-position-y:11.157025%}.flag-bo{background-position-y:11.570248%}.flag-br{background-position-y:11.983471%}.flag-bs{background-position-y:12.396694%}.flag-bt{background-position-y:12.809917%}.flag-bv{background-position-y:13.22314%}.flag-bw{background-position-y:13.636364%}.flag-by{background-position-y:14.049587%}.flag-bz{background-position-y:14.46281%}.flag-ca{background-position-y:14.876033%}.flag-cc{background-position-y:15.289256%}.flag-cd{background-position-y:15.702479%}.flag-cf{background-position-y:16.115702%}.flag-cg{background-position-y:16.528926%}.flag-ch{background-position-y:16.942149%}.flag-ci{background-position-y:17.355372%}.flag-ck{background-position-y:17.768595%}.flag-cl{background-position-y:18.181818%}.flag-cm{background-position-y:18.595041%}.flag-cn{background-position-y:19.008264%}.flag-co{background-position-y:19.421488%}.flag-cr{background-position-y:19.834711%}.flag-cu{background-position-y:20.247934%}.flag-cv{background-position-y:20.661157%}.flag-cx{background-position-y:21.07438%}.flag-cy{background-position-y:21.487603%}.flag-cz{background-position-y:21.900826%}.flag-de{background-position-y:22.31405%}.flag-dj{background-position-y:22.727273%}.flag-dk{background-position-y:23.140496%}.flag-dm{background-position-y:23.553719%}.flag-do{background-position-y:23.966942%}.flag-dz{background-position-y:24.380165%}.flag-ec{background-position-y:24.793388%}.flag-ee{background-position-y:25.206612%}.flag-eg{background-position-y:25.619835%}.flag-eh{background-position-y:26.033058%}.flag-er{background-position-y:26.446281%}.flag-es{background-position-y:26.859504%}.flag-et{background-position-y:27.272727%}.flag-fi{background-position-y:27.68595%}.flag-fj{background-position-y:28.099174%}.flag-fk{background-position-y:28.512397%}.flag-fm{background-position-y:28.92562%}.flag-fo{background-position-y:29.338843%}.flag-fr{background-position-y:29.752066%}.flag-ga{background-position-y:30.165289%}.flag-gd{background-position-y:30.578512%}.flag-ge{background-position-y:30.991736%}.flag-gf{background-position-y:31.404959%}.flag-gh{background-position-y:31.818182%}.flag-gi{background-position-y:32.231405%}.flag-gl{background-position-y:32.644628%}.flag-gm{background-position-y:33.057851%}.flag-gn{background-position-y:33.471074%}.flag-gp{background-position-y:33.884298%}.flag-gq{background-position-y:34.297521%}.flag-gr{background-position-y:34.710744%}.flag-gs{background-position-y:35.123967%}.flag-gt{background-position-y:35.53719%}.flag-gu{background-position-y:35.950413%}.flag-gw{background-position-y:36.363636%}.flag-gy{background-position-y:36.77686%}.flag-hk{background-position-y:37.190083%}.flag-hm{background-position-y:37.603306%}.flag-hn{background-position-y:38.016529%}.flag-hr{background-position-y:38.429752%}.flag-ht{background-position-y:38.842975%}.flag-hu{background-position-y:39.256198%}.flag-id{background-position-y:39.669421%}.flag-ie{background-position-y:40.082645%}.flag-il{background-position-y:40.495868%}.flag-in{background-position-y:40.909091%}.flag-io{background-position-y:41.322314%}.flag-iq{background-position-y:41.735537%}.flag-ir{background-position-y:42.14876%}.flag-is{background-position-y:42.561983%}.flag-it{background-position-y:42.975207%}.flag-jm{background-position-y:43.38843%}.flag-jo{background-position-y:43.801653%}.flag-jp{background-position-y:44.214876%}.flag-ke{background-position-y:44.628099%}.flag-kg{background-position-y:45.041322%}.flag-kh{background-position-y:45.454545%}.flag-ki{background-position-y:45.867769%}.flag-km{background-position-y:46.280992%}.flag-kn{background-position-y:46.694215%}.flag-kp{background-position-y:47.107438%}.flag-kr{background-position-y:47.520661%}.flag-kw{background-position-y:47.933884%}.flag-ky{background-position-y:48.347107%}.flag-kz{background-position-y:48.760331%}.flag-la{background-position-y:49.173554%}.flag-lb{background-position-y:49.586777%}.flag-lc{background-position-y:50%}.flag-li{background-position-y:50.413223%}.flag-lk{background-position-y:50.826446%}.flag-lr{background-position-y:51.239669%}.flag-ls{background-position-y:51.652893%}.flag-lt{background-position-y:52.066116%}.flag-lu{background-position-y:52.479339%}.flag-lv{background-position-y:52.892562%}.flag-ly{background-position-y:53.305785%}.flag-ma{background-position-y:53.719008%}.flag-mc{background-position-y:54.132231%}.flag-md{background-position-y:54.545455%}.flag-me{background-position-y:54.958678%}.flag-mg{background-position-y:55.371901%}.flag-mh{background-position-y:55.785124%}.flag-mk{background-position-y:56.198347%}.flag-ml{background-position-y:56.61157%}.flag-mm{background-position-y:57.024793%}.flag-mn{background-position-y:57.438017%}.flag-mo{background-position-y:57.85124%}.flag-mp{background-position-y:58.264463%}.flag-mq{background-position-y:58.677686%}.flag-mr{background-position-y:59.090909%}.flag-ms{background-position-y:59.504132%}.flag-mt{background-position-y:59.917355%}.flag-mu{background-position-y:60.330579%}.flag-mv{background-position-y:60.743802%}.flag-mw{background-position-y:61.157025%}.flag-mx{background-position-y:61.570248%}.flag-my{background-position-y:61.983471%}.flag-mz{background-position-y:62.396694%}.flag-na{background-position-y:62.809917%}.flag-nc{background-position-y:63.22314%}.flag-ne{background-position-y:63.636364%}.flag-nf{background-position-y:64.049587%}.flag-ng{background-position-y:64.46281%}.flag-ni{background-position-y:64.876033%}.flag-nl{background-position-y:65.289256%}.flag-no{background-position-y:65.702479%}.flag-np{background-position-y:66.115702%}.flag-nr{background-position-y:66.528926%}.flag-nu{background-position-y:66.942149%}.flag-nz{background-position-y:67.355372%}.flag-om{background-position-y:67.768595%}.flag-pa{background-position-y:68.181818%}.flag-pe{background-position-y:68.595041%}.flag-pf{background-position-y:69.008264%}.flag-pg{background-position-y:69.421488%}.flag-ph{background-position-y:69.834711%}.flag-pk{background-position-y:70.247934%}.flag-pl{background-position-y:70.661157%}.flag-pm{background-position-y:71.07438%}.flag-pn{background-position-y:71.487603%}.flag-pr{background-position-y:71.900826%}.flag-pt{background-position-y:72.31405%}.flag-pw{background-position-y:72.727273%}.flag-py{background-position-y:73.140496%}.flag-qa{background-position-y:73.553719%}.flag-re{background-position-y:73.966942%}.flag-ro{background-position-y:74.380165%}.flag-rs{background-position-y:74.793388%}.flag-ru{background-position-y:75.206612%}.flag-rw{background-position-y:75.619835%}.flag-sa{background-position-y:76.033058%}.flag-sb{background-position-y:76.446281%}.flag-sc{background-position-y:76.859504%}.flag-sd{background-position-y:77.272727%}.flag-se{background-position-y:77.68595%}.flag-sg{background-position-y:78.099174%}.flag-sh{background-position-y:78.512397%}.flag-si{background-position-y:78.92562%}.flag-sj{background-position-y:79.338843%}.flag-sk{background-position-y:79.752066%}.flag-sl{background-position-y:80.165289%}.flag-sm{background-position-y:80.578512%}.flag-sn{background-position-y:80.991736%}.flag-so{background-position-y:81.404959%}.flag-sr{background-position-y:81.818182%}.flag-ss{background-position-y:82.231405%}.flag-st{background-position-y:82.644628%}.flag-sv{background-position-y:83.057851%}.flag-sy{background-position-y:83.471074%}.flag-sz{background-position-y:83.884298%}.flag-tc{background-position-y:84.297521%}.flag-td{background-position-y:84.710744%}.flag-tf{background-position-y:85.123967%}.flag-tg{background-position-y:85.53719%}.flag-th{background-position-y:85.950413%}.flag-tj{background-position-y:86.363636%}.flag-tk{background-position-y:86.77686%}.flag-tl{background-position-y:87.190083%}.flag-tm{background-position-y:87.603306%}.flag-tn{background-position-y:88.016529%}.flag-to{background-position-y:88.429752%}.flag-tp{background-position-y:88.842975%}.flag-tr{background-position-y:89.256198%}.flag-tt{background-position-y:89.669421%}.flag-tv{background-position-y:90.082645%}.flag-tw{background-position-y:90.495868%}.flag-ty{background-position-y:90.909091%}.flag-tz{background-position-y:91.322314%}.flag-ua{background-position-y:91.735537%}.flag-ug{background-position-y:92.14876%}.flag-gb,.flag-uk{background-position-y:92.561983%}.flag-um{background-position-y:92.975207%}.flag-us{background-position-y:93.38843%}.flag-uy{background-position-y:93.801653%}.flag-uz{background-position-y:94.214876%}.flag-va{background-position-y:94.628099%}.flag-vc{background-position-y:95.041322%}.flag-ve{background-position-y:95.454545%}.flag-vg{background-position-y:95.867769%}.flag-vi{background-position-y:96.280992%}.flag-vn{background-position-y:96.694215%}.flag-vu{background-position-y:97.107438%}.flag-wf{background-position-y:97.520661%}.flag-ws{background-position-y:97.933884%}.flag-ye{background-position-y:98.347107%}.flag-za{background-position-y:98.760331%}.flag-zm{background-position-y:99.173554%}.flag-zr{background-position-y:99.586777%}.flag-zw{background-position-y:100%}';

const TkPhoneInput$1 = /*@__PURE__*/ proxyCustomElement(
  class TkPhoneInput extends H {
    constructor() {
      super();
      this.__registerHost();
      this.tkChange = createEvent(this, 'tk-change', 5);
      this.tkBlur = createEvent(this, 'tk-blur', 7);
      this.tkFocus = createEvent(this, 'tk-focus', 7);
      /**
       * The list of countries to display in the dropdown.
       */
      this.countries = [];
      /**
       * The current input value with mask applied.
       */
      this.inputValue = '';
      /**
       * Whether the input has been touched.
       */
      this.hasFocus = false;
      /**
       * Whether the country dropdown is open.
       */
      this.isDropdownOpen = false;
      /**
       * The current search term for filtering countries.
       */
      this.searchTerm = '';
      /**
       * Whether the input is disabled.
       * * @defaultValue false
       */
      this.disabled = false;
      /**
       * If `true`, the user cannot modify the value.
       * @defaultValue false
       */
      this.readonly = false;
      /**
       * Indicates whether the input is in an invalid state
       * @defaultValue false
       */
      this.invalid = false;
      /**
       * The default country to select (ISO country code).
       */
      this.defaultCountry = 'TR';
      /**
       * Displays a red asterisk (*) next to the label for visual emphasis.
       */
      this.showAsterisk = false;
      /**
       * Sets size for the component.
       */
      this.size = 'base';
      /**
       * Toggle the country dropdown.
       */
      this.toggleDropdown = () => {
        var _a;
        if (!this.disabled) {
          this.isDropdownOpen = !this.isDropdownOpen;
          if (this.isDropdownOpen) {
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.focus();
          }
        }
      };
      /**
       * Handle country selection from the dropdown.
       */
      this.handleCountrySelect = country => {
        var _a;
        this.setSelectedCountry(country.id);
        this.value = {
          rawValue: '',
          maskedValue: '',
          country: {
            id: this.selectedCountry.id,
            label: this.selectedCountry.label,
            dialCode: this.selectedCountry.dialCode,
            mask: this.selectedCountry.mask,
          },
        };
        this.tkChange.emit(this.value);
        this.inputValue = '';
        this.isDropdownOpen = false;
        this.searchTerm = '';
        (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
      };
      /**
       * Event handler for clicks outside the component to close dropdown.
       */
      this.handleClickOutside = event => {
        if (!this.el.contains(event.target)) {
          this.isDropdownOpen = false;
        }
      };
      /**
       * Handle changes to the country search input.
       */
      this.handleSearchChange = event => {
        this.searchTerm = event.target.value;
      };
      /**
       * Handle changes to the phone number input.
       */
      this.handleInput = event => {
        const inputElement = event.target;
        const rawValue = inputElement.value.replace(/\D/g, '');
        const currentMask = this.selectedCountry.mask;
        const maxDigits = (currentMask.match(/9/g) || []).length;
        const hasNoDigits = /[^\d() ]/.test(inputElement.value);
        if (rawValue.length > maxDigits || hasNoDigits) {
          this.inputRef.value = this.inputValue;
          return;
        }
        this.hasFocus = false;
        this.inputValue = this.applyMask(rawValue, currentMask);
        this.inputRef.value = this.inputValue;
        this.value = {
          rawValue,
          maskedValue: this.inputValue,
          country: {
            id: this.selectedCountry.id,
            label: this.selectedCountry.label,
            dialCode: this.selectedCountry.dialCode,
            mask: currentMask,
          },
        };
        this.tkChange.emit(this.value);
      };
      this.handleInputBlur = () => {
        this.hasFocus = false;
        this.tkBlur.emit();
      };
      this.handleInputFocus = () => {
        this.hasFocus = true;
        this.tkFocus.emit();
      };
      this.handleFormReset = () => {
        var _a;
        this.value = {
          rawValue: '',
          maskedValue: '',
          country: {
            id: this.selectedCountry.id,
            label: this.selectedCountry.label,
            dialCode: this.selectedCountry.dialCode,
            mask: this.selectedCountry.mask,
          },
        };
        this.tkChange.emit(this.value);
        this.isDropdownOpen = false;
        this.inputValue = '';
        this.inputRef.value = '';
        this.searchTerm = '';
        (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus();
      };
    }
    valueChanged(newValue) {
      var _a, _b;
      if (!newValue || (typeof newValue === 'object' && Object.keys(newValue).length === 0)) {
        this.handleFormReset();
      }
      if (!newValue.rawValue && !newValue.maskedValue) {
        this.inputValue = '';
      }
      if (newValue) {
        if ((_a = newValue === null || newValue === void 0 ? void 0 : newValue.country) === null || _a === void 0 ? void 0 : _a.id) {
          this.setSelectedCountry((_b = newValue === null || newValue === void 0 ? void 0 : newValue.country) === null || _b === void 0 ? void 0 : _b.id);
        }
        this.inputValue = this.applyMask(newValue.rawValue, this.selectedCountry.mask);
      }
    }
    /**
     * Add event listeners when the component is connected to the DOM.
     */
    connectedCallback() {
      document.addEventListener('click', this.handleClickOutside);
    }
    /**
     * Remove event listeners when the component is disconnected from the DOM.
     */
    disconnectedCallback() {
      document.removeEventListener('click', this.handleClickOutside);
    }
    /**
     * Initialize the component before it is rendered.
     */
    componentWillLoad() {
      var _a, _b, _c, _d;
      this.initializeCountries();
      if (
        (this === null || this === void 0 ? void 0 : this.value) &&
        ((_a = Object.keys(this === null || this === void 0 ? void 0 : this.value)) === null || _a === void 0 ? void 0 : _a.length)
      ) {
        if ((_c = (_b = this.value) === null || _b === void 0 ? void 0 : _b.country) === null || _c === void 0 ? void 0 : _c.id) {
          this.setSelectedCountry(this.value.country.id);
        }
        this.inputValue = this.applyMask(
          (_d = this === null || this === void 0 ? void 0 : this.value) === null || _d === void 0 ? void 0 : _d.rawValue,
          this === null || this === void 0 ? void 0 : this.selectedCountry.mask,
        );
      } else {
        this.setSelectedCountry(this.defaultCountry);
      }
    }
    /**
     * Update the component when properties change.
     */
    componentDidUpdate() {
      var _a;
      if (this.isDropdownOpen) {
        this.cleanup = autoUpdate(this.el.querySelector('.tk-phone-input__wrapper'), this.el, () => this.updatePosition(), {
          animationFrame: true,
        });
      } else {
        (_a = this.panelRef) === null || _a === void 0 ? void 0 : _a.remove();
        this.cleanup && this.cleanup();
      }
    }
    formResetCallback() {
      this.handleFormReset();
    }
    /**
     * Initialize the list of countries from the provided prop or fallback to internal list.
     */
    initializeCountries() {
      if (this.countryList) {
        this.countries = this.countryList;
      } else {
        this.countries = INTERNAL_COUNTRIES;
      }
    }
    /**
     * Set the selected country by its ID.
     */
    setSelectedCountry(countryId) {
      const country = this.countries.find(c => c.id.toUpperCase() === countryId.toUpperCase());
      this.selectedCountry = country || this.countries[0];
    }
    /**
     * Apply the mask to a raw phone number.
     */
    applyMask(rawValue, mask) {
      let maskedValue = '';
      let digitIndex = 0;
      for (let i = 0; i < mask.length && digitIndex < rawValue.length; i++) {
        if (mask[i] === '9') {
          maskedValue += rawValue[digitIndex++];
        } else {
          maskedValue += mask[i];
        }
      }
      return maskedValue;
    }
    updatePosition() {
      const tkInputRootEl = this.el.querySelector('.tk-phone-input__wrapper');
      if (tkInputRootEl && this.panelRef) {
        computePosition(tkInputRootEl, this.panelRef, {
          strategy: 'fixed',
          placement: 'bottom-start',
          middleware: [offset(4), flip(), shift({ padding: 5 })],
        }).then(({ y }) => {
          Object.assign(this.panelRef.style, {
            top: `${y}px`,
          });
        });
      }
    }
    /**
     * Get the filtered list of countries based on the search term.
     */
    getFilteredCountries() {
      const term = this.searchTerm.toLowerCase();
      if (!term) return this.countries;
      return this.countries.filter(country => country.label.toLowerCase().includes(term) || country.dialCode.includes(term));
    }
    renderLabel() {
      var _a;
      let label;
      if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const asterisk = h('span', { class: 'tk-phone-input__label-red-asterisk' }, '*');
        label = h(
          'label',
          { htmlFor: 'phone-input', class: 'tk-phone-input__label' },
          h('span', { class: 'tk-phone-input__label-title' }, this.label),
          this.showAsterisk ? asterisk : '',
        );
      }
      return label;
    }
    /**
     * Create the country selector dropdown.
     */
    renderCountrySelector() {
      return h(
        'div',
        { class: 'tk-phone-input__dropdown' },
        this.renderDropdownButton(),
        this.isDropdownOpen &&
          h('div', { class: 'tk-phone-input__dropdown-menu', role: 'listbox', ref: el => (this.panelRef = el) }, this.renderDropdownSearch(), this.renderDropdownList()),
      );
    }
    /**
     * Create the dropdown button for selecting a country.
     */
    renderDropdownButton() {
      return h(
        'button',
        { class: 'tk-phone-input__dropdown-button', onClick: this.toggleDropdown, type: 'button' },
        h(
          'div',
          { class: 'tk-phone-input__dropdown-button-selected' },
          h('tk-icon', Object.assign({}, getIconElementProps('stat_minus_1', { variant: null, size: 'large' }, undefined, 'span'))),
          h('img', {
            src: 'https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png',
            alt: `${this.selectedCountry.label} flag`,
            class: `flag flag-${this.selectedCountry.id.toLowerCase()}`,
          }),
          h('span', { class: 'tk-phone-input__dropdown-button-dial-code' }, this.selectedCountry.dialCode),
        ),
      );
    }
    /**
     * Create the search input for filtering countries in the dropdown.
     */
    renderDropdownSearch() {
      return h('tk-input', {
        'class': 'tk-phone-input__dropdown-menu-search',
        'size': this.size,
        'placeholder': 'Search',
        'value': this.searchTerm,
        'onTk-change': this.handleSearchChange,
        'ref': el => (this.searchInput = el),
        'icon': 'search',
        'iconPosition': 'right',
        'onClick': e => e.stopPropagation(),
      });
    }
    /**
     * Create the dropdown list of countries.
     */
    renderDropdownList() {
      return h(
        'ul',
        { class: 'tk-phone-input__dropdown-menu-list' },
        this.getFilteredCountries().map(country =>
          h(
            'li',
            {
              'class': 'tk-phone-input__dropdown-menu-list-item',
              'onClick': () => this.handleCountrySelect(country),
              'key': country.id,
              'role': 'option',
              'aria-selected': country.id === this.selectedCountry.id,
            },
            h('img', { src: 'https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png', alt: `${country.label} flag`, class: `flag flag-${country.id.toLowerCase()}` }),
            h('span', { class: 'tk-phone-input__dropdown-menu-list-country-label' }, country.label),
            h('span', { class: 'tk-phone-input__dropdown-menu-list-dial-id' }, country.dialCode),
          ),
        ),
      );
    }
    /**
     * Create the phone number input field.
     */
    renderPhoneInput() {
      return h('input', {
        type: 'tel',
        id: 'phone-input',
        class: 'tk-phone-input__input',
        autoComplete: 'off',
        placeholder: this.placeholder || this.selectedCountry.mask.replace(/9/g, '9'),
        value: this.inputValue,
        onInput: this.handleInput,
        onBlur: this.handleInputBlur,
        onFocus: this.handleInputFocus,
        disabled: this.disabled,
        ref: el => (this.inputRef = el),
      });
    }
    renderHint() {
      var _a, _b;
      let hint;
      if (((_a = this.hint) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info', { class: 'tk-phone-input__hint-icon', variant: null })));
        hint = h('span', { class: 'tk-phone-input__hint' }, hintIcon, h('span', { class: 'tk-phone-input__hint-text' }, this.hint));
      }
      if (((_b = this.error) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const hintIcon = h('tk-icon', Object.assign({}, getIconElementProps('info', { class: 'tk-phone-input__hint-icon', variant: null })));
        hint = h('span', { class: 'tk-phone-input__hint' }, hintIcon, h('span', { class: 'tk-phone-input__hint-text' }, this.error));
      }
      return hint;
    }
    /**
     * Render the component.
     */
    render() {
      return h(
        'div',
        {
          'key': '7662e22c08691c894da3adaa4768992253625073',
          'class': classNames('tk-phone-input', `tk-phone-input--${this.size}`),
          'aria-invalid': this.invalid,
          'aria-disabled': this.disabled,
          'aria-readonly': this.readonly,
        },
        this.renderLabel(),
        h('div', { key: '295e93c02a9592d69cc0748b2b4ae241dc33790c', class: 'tk-phone-input__wrapper' }, this.renderCountrySelector(), this.renderPhoneInput()),
        this.renderHint(),
      );
    }
    static get formAssociated() {
      return true;
    }
    get el() {
      return this;
    }
    static get watchers() {
      return {
        value: ['valueChanged'],
      };
    }
    static get style() {
      return tkPhoneInputScss + flagScss;
    }
  },
  [
    64,
    'tk-phone-input',
    {
      value: [1032],
      label: [1],
      countryList: [16, 'country-list'],
      disabled: [4],
      readonly: [4],
      invalid: [4],
      defaultCountry: [1, 'default-country'],
      placeholder: [1],
      showAsterisk: [4, 'show-asterisk'],
      hint: [1],
      error: [1],
      size: [1],
      countries: [32],
      selectedCountry: [32],
      inputValue: [32],
      hasFocus: [32],
      isDropdownOpen: [32],
      searchTerm: [32],
    },
    undefined,
    {
      value: ['valueChanged'],
    },
  ],
);
function defineCustomElement$1() {
  if (typeof customElements === 'undefined') {
    return;
  }
  const components = ['tk-phone-input', 'tk-button', 'tk-chips', 'tk-icon', 'tk-input', 'tk-spinner'];
  components.forEach(tagName => {
    switch (tagName) {
      case 'tk-phone-input':
        if (!customElements.get(tagName)) {
          customElements.define(tagName, TkPhoneInput$1);
        }
        break;
      case 'tk-button':
        if (!customElements.get(tagName)) {
          defineCustomElement$6();
        }
        break;
      case 'tk-chips':
        if (!customElements.get(tagName)) {
          defineCustomElement$5();
        }
        break;
      case 'tk-icon':
        if (!customElements.get(tagName)) {
          defineCustomElement$4();
        }
        break;
      case 'tk-input':
        if (!customElements.get(tagName)) {
          defineCustomElement$3();
        }
        break;
      case 'tk-spinner':
        if (!customElements.get(tagName)) {
          defineCustomElement$2();
        }
        break;
    }
  });
}

const TkPhoneInput = TkPhoneInput$1;
const defineCustomElement = defineCustomElement$1;

export { TkPhoneInput, defineCustomElement };
//# sourceMappingURL=tk-phone-input.js.map

//# sourceMappingURL=tk-phone-input.js.map
