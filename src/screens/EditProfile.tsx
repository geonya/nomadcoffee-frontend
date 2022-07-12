import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import SubmitButton from '../components/buttons/SubmitButton';
import FormError from '../components/FormError';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { useEditProfileMutation } from '../generated/graphql';
import { useSeeMe } from '../hooks/useSeeMe';

interface EditFormValues {
  name: string;
  file: FileList;
  password: string;
  email: string;
  address: string;
  result: string;
}

export default function EditProfile() {
  // state
  const { data } = useSeeMe();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<EditFormValues>({ mode: 'onChange' });
  const [avatarPhoto, setAvatarPhoto] = useState('');
  const fileWatch = watch('file');

  const [editProfileMutation, { loading }] = useEditProfileMutation();

  const onValid = (data: EditFormValues) => {
    if (loading) return;
    const photo = data.file[0];
    editProfileMutation({
      variables: {
        ...data,
        avatar: photo,
      },
    });
  };

  useEffect(() => {
    if (fileWatch && fileWatch.length > 0) {
      const file = fileWatch[0];
      setAvatarPhoto(URL.createObjectURL(file));
    }
  }, [fileWatch]);
  useEffect(() => {
    if (data?.seeMyProfile.avatarUrl) {
      setAvatarPhoto(data.seeMyProfile.avatarUrl);
    }
    if (data?.seeMyProfile.name) {
      setValue('name', data.seeMyProfile.name);
    }
    if (data?.seeMyProfile.email) {
      setValue('email', data.seeMyProfile.email);
    }
  }, [data, setValue]);
  return (
    // node
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit(onValid)}>
          <AvatarContainer>
            <PhotoInputLabel photo={avatarPhoto}>
              {avatarPhoto !== '' || (
                <svg
                  fill='white'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              )}

              <input
                type='file'
                accept='image/*'
                {...register('file', {
                  required: 'You need to upload Photo',
                })}
              />
            </PhotoInputLabel>
          </AvatarContainer>
          <label>
            <span>Name</span>
            <Input
              type='text'
              placeholder='Name'
              {...register('name', { required: true })}
            />
          </label>
          <label>
            <span>New Password</span>
            <Input
              type='password'
              {...register('password', {
                required: false,
                minLength: {
                  value: 4,
                  message: '비밀번호는 최소 4자 이상이여야 합니다.',
                },
                onChange: () => clearErrors('result'),
              })}
            />
          </label>

          <FormError message={errors.password?.message} />
          <label>
            <span>E-Mail</span>
            <Input
              type='text'
              placeholder='E-Mail'
              {...register('email', { required: true })}
            />
          </label>
          <label>
            <span>Address</span>
            <Input
              type='text'
              placeholder='Address'
              {...register('address', { required: false })}
            />
          </label>
          <SubmitButton
            type='submit'
            value={loading ? 'Loading...' : 'Submit'}
          />
        </Form>
      </Container>
    </Layout>
  );
}

// css

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  margin-top: 30px;
  width: 80%;
  label {
    span {
      font-size: 11px;
      opacity: 0.8;
    }
  }
`;
const AvatarContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: grid;
  place-content: center;
`;
const PhotoInputLabel = styled.label<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.25);
  display: grid;
  place-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  svg {
    width: 80px;
    height: 80px;
  }
  input {
    display: none;
  }
`;
