import {
  TkCard,
  TkButton,
  TkCheckbox,
  TkInput,
  TkSelect,
  TkTextarea,
  TkDatepicker,
} from '@takeoff-ui/react';
import { FormEvent, useState } from 'react';
import { z } from 'zod';

function ZodValidation() {
  const options = [
    { label: 'item 1', value: '1' },
    { label: 'item 2', value: '2' },
    { label: 'item 3', value: '3' },
  ];

  // form verilerinin toplanması için form data state'i yaratılır
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: '',
    dob: '',
    check: false,
  });

  // error mesajları için errors state'i yaratılır
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    country: '',
    address: '',
    password: '',
    confirmPassword: '',
    dob: '',
    check: '',
  });

  // validasyon şemeası ve kuralları tanımlanır
  const schemaZod = z
    .object({
      name: z.string().min(3, 'Minimum 3 karakter giriniz.'),
      email: z.string().email('Geçerli bir email adresi giriniz.'),
      country: z.string().min(1, 'Bu alan zorunludur.'),
      address: z.string().min(10, 'Minimum 10 karakter giriniz.'),
      password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır.'),
      confirmPassword: z.string().min(1, 'Bu alan zorunludur.'),
      dob: z
        .string()
        .date()
        .refine(
          (val) => {
            const date: Date = new Date(val);
            const beginningDate = new Date('01-01-1920');
            const endingDate = new Date('01-01-2010');
            if (date < beginningDate || date > endingDate) {
              return false;
            }
            return true;
          },
          { message: 'Geçerli bir tarih giriniz' },
        ),
      check: z
        .boolean()
        .refine((val) => val == true, { message: 'Bu alan zorunludur' }),
    })
    // password ve confirm password alanları birbirine eşitmi diye kontrolü için dinamik validasyon örneği
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Parolalar aynı değil',
          path: ['confirmPassword'],
        });
      }
    });

  const handleInputChange = (event: CustomEvent) => {
    const { name } = event.target as HTMLTkInputElement | HTMLTkSelectElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: event.detail,
    }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // Belirtilen validasyon kuralları ile toplanan form datanın kontrol edilmesi
    const validationResult = schemaZod.safeParse(formData);

    if (!validationResult.success) {
      // error mesajlarını işleme
      const errorMessages = validationResult.error.errors.reduce(
        (acc: any, error: any) => {
          acc[error.path[0]] = error.message;
          return acc;
        },
        {},
      );

      setErrors(errorMessages);
    } else {
      // Eğer form geçerli ise hatalar temizlenir
      setErrors({
        name: '',
        email: '',
        country: '',
        address: '',
        password: '',
        confirmPassword: '',
        dob: '',
        check: '',
      });

      // form doğrulandı. Burada backend çağrısı yapılabilir
      console.log('Form başarıyla doğrulandı:', formData);
    }
  };
  // Zod validation end

  return (
    <TkCard>
      <form onSubmit={submit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <TkInput
            name="name"
            mode="text"
            label="Name"
            value={formData.name}
            onTkChange={handleInputChange}
            invalid={!!errors.name}
            error={errors.name}
          />
          <TkInput
            name="email"
            mode="text"
            label="Email"
            value={formData.email}
            onTkChange={handleInputChange}
            invalid={!!errors.email}
            error={errors.email}
          />
          <TkSelect
            name="country"
            label="Country"
            value={formData.country}
            onTkChange={handleInputChange}
            options={options}
            optionValueKey="value"
            invalid={!!errors.country}
            error={errors.country}
          />
          <TkTextarea
            name="address"
            label="Address"
            value={formData.address}
            onTkChange={handleInputChange}
            invalid={!!errors.address}
            error={errors.address}
          />
          <TkInput
            name="password"
            mode="password"
            showSafetyStatus={true}
            label="Password"
            value={formData.password}
            onTkChange={handleInputChange}
            invalid={!!errors.password}
            error={errors.password}
          />
          <TkInput
            name="confirmPassword"
            mode="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onTkChange={handleInputChange}
            invalid={!!errors.confirmPassword}
            error={errors.confirmPassword}
          />
          <TkDatepicker
            value={formData.dob}
            label={'forms.dob'}
            placeholder={'forms.dob-format'}
            dateFormat="yyyy-MM-dd"
            onTkChange={(e) =>
              setFormData({ ...formData, dob: e.detail as string })
            }
            invalid={!!errors.dob}
            error={errors.dob}
          />
          <TkCheckbox
            name="check"
            value={formData.check}
            onTkChange={handleInputChange}
            label="Okudum onayladım"
            invalid={!!errors.check}
          />
          <TkButton
            mode="submit"
            onClick={submit}
            label="Validate"
            variant="primary"
          />
        </div>
      </form>
    </TkCard>
  );
}

export default ZodValidation;
