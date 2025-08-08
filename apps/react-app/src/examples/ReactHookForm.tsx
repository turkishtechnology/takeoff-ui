import { TkButton, TkCard, TkCheckbox, TkDatepicker, TkInput, TkRadio, TkRadioGroup, TkSelect, TkTextarea, TkToggle } from '@takeoff-ui/react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
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

    reset,
    control,
  } = useForm<IFormInput>({
    defaultValues: {
      gender: GenderEnum.male,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };
  const handleReset = () => {
    reset();
  };
  // React Hook Form End

  return (
    <TkCard>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TkInput mode="text" label="Name" invalid={!!errors?.name} error={errors?.name && 'Bu alan gerekli'} value={field.value} onTkChange={e => field.onChange(e.detail)} />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <TkSelect
                label="Gender"
                options={selectOptions}
                value={field.value}
                invalid={!!errors?.gender}
                error={errors?.gender && 'Bu alan gerekli'}
                onTkChange={e => field.onChange(e.detail)}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TkTextarea label="Address" invalid={!!errors?.address} error={errors?.address && 'Bu alan gerekli'} value={field.value} onTkChange={e => field.onChange(e.detail)} />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TkInput
                mode="password"
                showSafetyStatus={true}
                label="Password"
                invalid={!!errors?.password}
                error={errors?.password && 'Bu alan gerekli'}
                value={field.value}
                onTkChange={e => field.onChange(e.detail)}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field }) => <TkDatepicker label="Date" mode="single" invalid={!!errors?.date} onTkChange={e => field.onChange(e.detail)} value={field.value} />}
          />
          <Controller control={control} name="toggle" render={({ field }) => <TkToggle onTkChange={e => field.onChange(e.detail)} />} />
          <Controller
            control={control}
            name="check"
            render={({ field }) => <TkCheckbox label="Okudum onayladım." invalid={!!errors?.check} onTkChange={e => field.onChange(e.detail)} value={field.value} />}
          />
          <Controller
            control={control}
            name="radio"
            render={({ field }) => (
              <TkRadioGroup value={field.value} onTkChange={e => field.onChange(e.detail)} invalid={!!errors?.radio}>
                <TkRadio value="test-1" label="Test 1" />
                <TkRadio value="test-2" label="Test 2" />
              </TkRadioGroup>
            )}
          />
          <TkButton onTkClick={() => handleReset()} label="reset" variant="primary" fullWidth={true} type="outlined" mode="reset" />
          <TkButton mode="submit" label="Validate" variant="primary" fullWidth={true} />
        </div>
      </form>
    </TkCard>
  );
}
export default ReactHookForm;
