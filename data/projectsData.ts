interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Dattorro Ambisonics Reverb',
    description: `Max/MSPで実装したDattorroのプレートリバーブアルゴリズムをアンビソニックスに対応させたリバーブシステム。
    アンビソニックス信号を入力として受け取り、空間的な残響を付加することができます。`,
    imgSrc: '/static/images/projects/dattorro.png',
    href: 'https://github.com/koguma2102/DattorroAmbisonicsReverb',
  },
  {
    title: 'VRChat Ambisonics System',
    description: `VRChatで使用できるアンビソニックスオーディオシステム。
    没入感のある3D音響体験を提供し、VR空間での音の自然な移動と空間的な広がりを実現します。`,
    imgSrc: '/static/images/projects/vrchat.png',
    href: 'https://github.com/koguma2102/VRChatAmbisonics',
  },
]

export default projectsData
