import { getUsersRanking } from '@/libs/axios/product/reviewRankingApi'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import defaultProfile from '@images/logo_small_image.png'
import { match } from 'ts-pattern'
import classNames from 'classnames'

export default function ReviewerRanking() {
  const { data: rankData } = useQuery({ queryKey: ['userRank'], queryFn: getUsersRanking })

  const rankingColor = ({ rank }: { rank: number }) =>
    match({ rank })
      .with({ rank: 1 }, () => 'text-brand-pink bg-brand-pink ')
      .with({ rank: 2 }, () => 'text-brand-green bg-brand-green ')
      .otherwise(() => 'text-brand-gray-light bg-brand-gray-light')
  return (
    <div className="flex shrink-0 grow gap-5 border-l border-[#282530] pl-2 xl:gap-[30px] xl:pt-[45px]">
      <div className="flex w-full flex-col xl:items-center">
        <div className="flex flex-col gap-5 xl:gap-[30px]">
          <div className="text-sm xl:text-base">리뷰어 랭킹</div>
          <div className="scroll-hidden flex gap-[15px] md:gap-5 xl:flex-col xl:gap-[30px]">
            {rankData?.slice(0, 5).map((user, index) => (
              <div key={user.id} className="flex shrink-0 items-center gap-2.5">
                <span className="relative h-[36px] w-[36px] overflow-hidden rounded-full">
                  <Image fill src={user.image || defaultProfile} alt="프로필이미지" />
                </span>
                <div className="flex flex-col gap-[5.5px]">
                  <div className="flex items-center gap-[5px]">
                    <span
                      className={classNames(
                        'flex h-[16px] w-[26px] shrink-0 items-center justify-center rounded-[50px] bg-opacity-10 text-[10px]',
                        rankingColor({ rank: index + 1 }),
                      )}
                    >
                      {index + 1}등
                    </span>
                    <span>{user.nickname}</span>
                  </div>
                  <div className="flex gap-2.5 text-[10px] font-light text-brand-gray-dark">
                    <span> 팔로워 {user.followersCount}</span>
                    <span> 리뷰 {user.reviewCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
