import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import SubmitButton from '../components/buttons/SubmitButton';
import FormError from '../components/FormError';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import {
  useCreateCommentMutation,
  useFindCommentQuery,
  useSeeCafeQuery,
  useToggleLikeMutation,
} from '../generated/graphql';
import { useSeeMe } from '../hooks/useSeeMe';

interface CommentFormValues {
  comment: string;
}

export default function Cafe() {
  const navigate = useNavigate();

  const [modalPhoto, setModalPhoto] = useState('');
  const [contentBoxHeight, SetContentBoxHeight] = useState<
    number | null | undefined
  >(0);

  const { id: cafeId } = useParams();
  const { data: myData } = useSeeMe();

  const { data, loading } = useSeeCafeQuery({
    variables: { cafeId: +cafeId! },
    onCompleted: (data) => {
      if (!data.seeCafe) return;
    },
  });

  // like mutation
  const [toggleLikeMutation] = useToggleLikeMutation({
    update: (cache, result) => {
      cache.modify({
        id: `Cafe:${data?.seeCafe?.id}`,
        fields: {
          isLiked: (prev) => !prev,
          countLikes: (prev) => (data?.seeCafe?.isLiked ? prev - 1 : prev + 1),
        },
      });
    },
  });
  const toggleLike = (id: number) => {
    if (loading) return;
    toggleLikeMutation({
      variables: {
        cafeId: id,
      },
    });
  };
  //

  // comment query & mutation
  const { data: commentData } = useFindCommentQuery({
    variables: {
      cafeId: data?.seeCafe?.id! || +cafeId?.toString()!,
    },
  });
  const [inputShowing, setInputShowing] = useState(true);
  const [commentMutation, { loading: commentLoading }] =
    useCreateCommentMutation({
      onCompleted: (data) => {
        if (!data.createComment?.ok) return;
        setInputShowing(false);
      },
      update: (cache, result) => {
        cache.modify({
          id: `Cafe:${data?.seeCafe?.id}`,
          fields: {
            // TODO cache upadte
            comments: (prev) => {
              const filteredPrev = prev.filter((comment: any) => {
                if (comment.user['__ref']) {
                  return !comment.user['__ref']?.includes(
                    myData?.seeMyProfile.username
                  );
                } else {
                  return comment.user.id !== myData?.seeMyProfile.id;
                }
              });
              return [result.data?.createComment?.comment, ...filteredPrev];
            },
          },
        });
      },
    });

  const [inputRating, setInputRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormValues>({
    mode: 'onChange',
  });
  const onCommentFormValid = ({ comment }: CommentFormValues) => {
    if (!commentLoading)
      commentMutation({
        variables: {
          caption: comment,
          cafeId: data?.seeCafe?.id! || +cafeId?.toString()!,
          rating: inputRating,
        },
      });
  };

  useEffect(() => {
    if (commentData?.findComment?.comment) {
      setValue('comment', commentData?.findComment?.comment?.caption);
      setInputRating(commentData.findComment?.comment?.rating);
      setInputShowing(false);
    }
  }, [commentData, setValue]);
  //

  const cafeContentBoxRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    SetContentBoxHeight(cafeContentBoxRef?.current?.offsetHeight);
  }, []);

  // kakao map api
  useEffect(() => {
    const container = document.getElementById('map');
    if (!container) return;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();
    if (!data?.seeCafe?.address) return;
    geocoder.addressSearch(data?.seeCafe?.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        new kakao.maps.Marker({
          map,
          position: coords,
        });
        map.setCenter(coords);
      }
    });
  }, [data?.seeCafe?.address]);

  // rating calcuration
  useLayoutEffect(() => {
    if (data?.seeCafe?.comments) {
      const commentsCount = data?.seeCafe?.comments?.length;
      if (commentsCount > 0) {
        let ratingSum = 0;
        data?.seeCafe?.comments.map(
          (comment) => (ratingSum += comment?.rating || 0)
        );
        setAverageRating(ratingSum / commentsCount);
      }
    }
  }, [data]);
  return (
    <Layout hasHeader={false}>
      <Wrapper>
        <TopContainer>
          <HeaderBtn onClick={() => navigate('..', { replace: true })}>
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </HeaderBtn>
          <Map id='map'></Map>
          <CafeContent ref={cafeContentBoxRef}>
            <CafeInfoBox>
              <CafeTitleBox>
                <div>
                  <CafeTitleStars>
                    <span>★</span> <span>{averageRating || 0}</span>
                  </CafeTitleStars>
                  <CafeTitle>{data?.seeCafe?.name}</CafeTitle>
                </div>
                <CafeCreatorBox
                  onClick={() =>
                    navigate(`/users/${data?.seeCafe?.user?.username}`)
                  }
                >
                  <Avatar
                    source={data?.seeCafe?.user?.avatarUrl || ''}
                    size={35}
                  />
                  <CafeCreator>{data?.seeCafe?.user?.username}</CafeCreator>
                </CafeCreatorBox>
              </CafeTitleBox>
              <CafeDescription>
                <h4>{data?.seeCafe?.description}</h4>
              </CafeDescription>
              <CafeAddress>{data?.seeCafe?.address}</CafeAddress>
              <FooterBox>
                <LikeButton onClick={() => toggleLike(data?.seeCafe?.id!)}>
                  <svg
                    fill={data?.seeCafe?.isLiked ? 'currentColor' : 'none'}
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    ></path>
                  </svg>
                  <span>{data?.seeCafe?.countLikes}</span>
                </LikeButton>
                {myData?.seeMyProfile.id === data?.seeCafe?.user.id && (
                  <EditButton
                    onClick={() => navigate(`/cafe/${data?.seeCafe?.id}/edit`)}
                  >
                    <svg
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      ></path>
                    </svg>
                  </EditButton>
                )}
              </FooterBox>
            </CafeInfoBox>
            <AnimatePresence>
              {modalPhoto !== '' ? (
                <>
                  <ModalBackground
                    onClick={() => setModalPhoto('')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { type: 'tween' } }}
                    exit={{ opacity: 0 }}
                  >
                    <ModalPhoto
                      photo={modalPhoto}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: { type: 'tween' },
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                    />
                  </ModalBackground>
                </>
              ) : null}
            </AnimatePresence>
          </CafeContent>
        </TopContainer>

        <PhotosGridContainer marginTop={contentBoxHeight || 0}>
          {data?.seeCafe?.photos && data?.seeCafe?.photos.length > 0 ? (
            <PhotosReivewRow>
              {data.seeCafe.photos.map((photo, i) => (
                <PhotoReview
                  photo={photo?.url!}
                  key={photo?.url}
                  onClick={() => setModalPhoto(photo?.url!)}
                />
              ))}
            </PhotosReivewRow>
          ) : (
            <Loading />
          )}
        </PhotosGridContainer>

        <CommentContainer>
          <CommentTitle>
            Comments ({data?.seeCafe?.comments?.length || 0})
          </CommentTitle>
          {inputShowing && (
            <CommentForm onSubmit={handleSubmit(onCommentFormValid)}>
              <CommentInputStarsBox>
                <span onClick={() => setInputRating(1)}>
                  {inputRating >= 1 ? '★' : '☆'}
                </span>
                <span onClick={() => setInputRating(2)}>
                  {inputRating >= 2 ? '★' : '☆'}
                </span>
                <span onClick={() => setInputRating(3)}>
                  {inputRating >= 3 ? '★' : '☆'}
                </span>
                <span onClick={() => setInputRating(4)}>
                  {inputRating >= 4 ? '★' : '☆'}
                </span>
                <span onClick={() => setInputRating(5)}>
                  {inputRating === 5 ? '★' : '☆'}
                </span>
              </CommentInputStarsBox>
              <CommentInputBox>
                <Input
                  type='text'
                  {...register('comment', {
                    required: true,
                    maxLength: { value: 22, message: '22자까지만 적어주세요.' },
                  })}
                />
                <SubmitButton type='submit' value='Write' />
              </CommentInputBox>
              <FormError message={errors.comment?.message} />
            </CommentForm>
          )}

          <CommentsList>
            {data?.seeCafe?.comments?.map((comment, i) => (
              <Comment key={i}>
                <CommentStarsBox>
                  <span>
                    {comment?.rating && comment.rating >= 1 ? '★' : '☆'}
                  </span>
                  <span>
                    {comment?.rating && comment.rating >= 2 ? '★' : '☆'}
                  </span>
                  <span>
                    {comment?.rating && comment.rating >= 3 ? '★' : '☆'}
                  </span>
                  <span>
                    {comment?.rating && comment.rating >= 4 ? '★' : '☆'}
                  </span>
                  <span>
                    {comment?.rating && comment.rating === 5 ? '★' : '☆'}
                  </span>
                </CommentStarsBox>
                <CommentContentBox>
                  <CommentCreatorBox>
                    <Avatar source={comment?.user?.avatarUrl || ''} size={30} />
                    <CommentCreator>{comment?.user?.username}</CommentCreator>
                  </CommentCreatorBox>
                  <CommentTextBox>
                    <CommentText>{comment?.caption}</CommentText>
                  </CommentTextBox>
                  {myData?.seeMyProfile.id === comment?.user?.id && (
                    <CommentBtnBox>
                      <CommentBtn onClick={() => setInputShowing(true)}>
                        <svg
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                          ></path>
                        </svg>
                      </CommentBtn>
                      <CommentBtn red>
                        <svg
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>
                      </CommentBtn>
                    </CommentBtnBox>
                  )}
                </CommentContentBox>
              </Comment>
            ))}
          </CommentsList>
        </CommentContainer>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Map = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 20px;
  h4 {
    width: 80px;
    height: 40px;
    display: block;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
`;
const CafeContent = styled.div`
  width: 100%;
  position: absolute;
  top: 200px;
  z-index: 10;
  padding: 0 20px;
  color: ${(props) => props.theme.white};
`;

const PhotosGridContainer = styled.div<{ marginTop: number }>`
  width: 100%;
  margin-top: ${(props) => `${props.marginTop - 75}px`};
  padding: 0 20px;
`;

const PhotosReivewRow = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(3, 1fr);
`;
const PhotoReview = styled.div<{ photo: string }>`
  border-radius: 10px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
`;
const ModalPhoto = styled(motion.div)<{ photo: string }>`
  width: 360px;
  height: 250px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;
const CafeTitleStars = styled.div`
  span {
    font-size: 15px;
    margin-right: 2px;
    color: ${(props) => props.theme.pointColor};
    width: 25px;
    height: 25px;
  }
`;

const CafeTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;
const CafeDescription = styled.div`
  word-wrap: break-word;
  h4 {
    opacity: 0.7;
  }
`;
const CafeAddress = styled.span`
  font-size: 11.5px;
  opacity: 0.4;
`;
const CafeInfoBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  line-height: 2;
  display: flex;
  flex-direction: column;
  min-height: 200px;
`;

const FooterBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px 0;
`;
const EditButton = styled.button`
  opacity: 0.7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.white};
  }
`;
const LikeButton = styled.button`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 5px;
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.red};
  }
  span {
    opacity: 0.6;
    color: ${(props) => props.theme.white};
  }
`;
const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-content: center;
`;

const HeaderBtn = styled.button`
  position: absolute;
  padding: 20px;
  top: 10px;
  left: 10px;
  z-index: 2;

  svg {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

const CafeCreatorBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const CafeCreator = styled.span`
  opacity: 0.7;
  font-size: 11px;
`;
const CafeTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentContainer = styled.div`
  margin-top: 34px;
  width: 80%;
`;
const CommentTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 13px;
`;

const CommentForm = styled.form`
  margin: 10px 0;
  line-height: 0.3;
`;
const CommentsList = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-auto-flow: row;
`;
const Comment = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
`;

const CommentBtnBox = styled.div`
  align-self: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-right: 5px;
  }
`;
const CommentText = styled.span`
  align-self: center;
  font-size: 11.5px;
  opacity: 0.8;
`;
const CommentInputBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 5fr 1fr;
  font-size: 12px;
  input {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;
const CommentStarsBox = styled.div`
  width: 65px;
  display: grid;
  grid-auto-flow: column;
  span {
    font-size: 13.5px;
    color: ${(props) => props.theme.pointColor};
  }
`;

const CommentContentBox = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 8fr 1fr;
  padding: 1px;
`;

const CommentCreatorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1px;
`;
const CommentCreator = styled.span`
  font-size: 10px;
  opacity: 0.7;
`;

const CommentInputStarsBox = styled.div`
  width: fit-content;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  span {
    cursor: pointer;
    text-align: center;
    font-size: 22px;
    color: ${(props) => props.theme.pointColor};
  }
`;
const CommentBtn = styled.button<{ red?: boolean }>`
  svg {
    stroke: ${(props) =>
      props.red ? props.theme.red : props.theme.pointColor};
    width: 20px;
    height: 20px;
  }
`;

const CommentTextBox = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
