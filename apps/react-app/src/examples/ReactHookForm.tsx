import {
  TkButton,
  TkCard,
  TkCheckbox,
  TkDatepicker,
  TkInput,
  TkRadio,
  TkRadioGroup,
  TkSelect,
  TkTextarea,
  TkToggle,
} from '@takeoff-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

function ReactHookForm() {
  // React Hook Form

  enum GenderEnum {
    female = 'female',
    male = 'male',
    other = 'other',
  }

  interface IFormInput {
    name: string;
    password: string;
    gender: GenderEnum | null;
    address: string;
    date: string;
    toggle: boolean;
    check: boolean;
    radio: string;
  }

  const selectOptions = [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'other', label: 'Other' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      gender: GenderEnum.male,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  // React Hook Form End

  return (
    <TkCard>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => {
          console.log('resetlendi');
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <TkInput
            mode="text"
            label="Name"
            {...register('name', { required: true })}
            invalid={!!errors?.name}
            error={errors?.name && 'Bu alan gerekli'}
          />

          <TkSelect
            label="Gender"
            options={selectOptions}
            {...register('gender', { required: true })}
            invalid={!!errors?.gender}
            error={errors?.gender && 'Bu alan gerekli'}
            onTkChange={(e) => {
              console.log('select change', e.detail);
              // setValue('gender', e.detail);
            }}
          />
          <TkTextarea
            label="Address"
            {...register('address', { required: true })}
            invalid={!!errors?.address}
            error={errors?.address && 'Bu alan gerekli'}
          />
          <TkInput
            mode="password"
            showSafetyStatus={true}
            label="Password"
            {...register('password', { required: true })}
            invalid={!!errors?.password}
            error={errors?.password && 'Bu alan gerekli'}
          />
          <TkDatepicker
            label="Date"
            mode="single"
            {...register('date', { required: true })}
            invalid={!!errors?.date}
            error={errors?.date && 'Bu alan gerekli'}
            onTkChange={(e) => setValue('date', e.detail)}
          />
          <TkToggle
            {...register('toggle', { required: true })}
            onTkChange={(e) => setValue('toggle', e.detail)}
          />
          <TkCheckbox
            label="Okudum onayladım."
            {...register('check', { required: true })}
            invalid={!!errors?.check}
            onTkChange={(e) => setValue('check', e.detail)}
          />
          <TkRadioGroup
            {...register('radio', { required: true })}
            onTkChange={(e) => setValue('radio', e.detail)}
            invalid={!!errors?.radio}
          >
            <TkRadio value="test-1" label="Test 1" />
            <TkRadio value="test-2" label="Test 2" />
          </TkRadioGroup>
          <TkButton
            mode="button"
            onClick={() =>
              reset({
                gender: null,
              })
            }
            label="reset"
            variant="primary"
            fullWidth={true}
            type="outlined"
          />
          <TkButton
            mode="submit"
            label="Validate"
            variant="primary"
            fullWidth={true}
          />
        </div>
      </form>
    </TkCard>
  );
}
export default ReactHookForm;
