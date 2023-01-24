import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface CardProps {
  title: string
  children?: React.ReactNode
  image: string
  href: string
}

function Card({ children: description, href, image, title }: CardProps) {
  const cardVariants = {
    hover: {
      scale: 1.05,
    },
    initial: {
      scale: 1,
    },
  }

  const glowVariants = {
    hover: {
      opacity: 0.8,
    },
    initial: {
      scale: 1.05,
      opacity: 0,
    },
  }

  return (
    <Link href={href}>
      <a>
        <motion.div initial="initial" whileHover="hover" className="relative">
          <motion.div
            style={{
              background: "linear-gradient(90deg, #ffa0ae 0%, #aacaef 75%)",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              WebkitFilter: "blur(15px)",
              filter: "blur(15px)",
              borderRadius: "16px",
            }}
            variants={glowVariants}
            transition={{
              ease: "easeOut",
              delay: 0.15,
            }}
          ></motion.div>

          <motion.div className="h-80 relative bg-[#282828] rounded-lg z-10 overflow-hidden" variants={cardVariants}>
            <div className="relative w-full h-36">
              <Image layout="fill" objectFit="cover" src={image} alt="img" />
            </div>
            <div className="p-6">
              <h3>{title}</h3>
              <div className="font-light mt-1 text-base sm:text-sm">{description}</div>
            </div>
          </motion.div>
        </motion.div>
      </a>
    </Link>
  )
}

export default function GraphicDesign() {
  return (
    <main className="bg-[#181818] py-12 text-white relative font-display">
      <motion.section
        key="main"
        className="relative z-10 flex min-h-screen w-full flex-col px-12"
        initial="initial"
        animate="animate"
        variants={{
          initial: { y: 80, opacity: 0 },
          animate: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: [0.6, -0.05, 0.01, 0.99],
            },
          },
        }}
      >
        <h1 className="text-4xl mb-6 font-bold">graphic design portfolio</h1>

        <h2 className="text-2xl mb-2 text-left font-bold">work experience</h2>

        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-6 h-full w-full">
          <Card
            title="Triam Udom Computer Club"
            href="https://www.instagram.com/triamcomputer.club/"
            image="/assets/tucc.jpg"
          >
            <ul className="list-inside list-disc">
              <li>ช่วยจัดทำ Artwork และวางแผนการประชาสัมพันธ์ในช่องทาง​ Social Media ของชมรม</li>
            </ul>
          </Card>
          <Card title="Thinc. Club" href="https://www.instagram.com/thinc.in.th/" image="/assets/thinc.png">
            <ul className="list-inside list-disc">
              <li>ช่วยจัดทำ Artwork และวางแผนการประชาสัมพันธ์ในช่องทาง​ Social Media ของชมรม</li>
            </ul>
          </Card>
          <Card
            title="Food & Film Festival 2023"
            href="https://www.instagram.com/foodfilmfest.cu/"
            image="/assets/fff.png"
          >
            <ul className="list-inside list-disc">
              <li>เป็นประธานฝ่าย Graphic Design</li>
            </ul>
          </Card>
          <Card title="Vid Love Vid U" href="https://www.instagram.com/vidlovevidu.chula/" image="/assets/vlvu.png">
            <ul className="list-inside list-disc">
              <li>เป็นประธานฝ่าย Graphic Design</li>
            </ul>
          </Card>
          <Card title="Chula Town Hall" href="https://www.instagram.com/cutownhall_/" image="/assets/cutownhall.png">
            <ul className="list-inside list-disc">
              <li>ช่วยจัดทำ Artwork</li>
            </ul>
          </Card>
        </div>

        {/* <h2 className="text-2xl my-4 text-left font-bold">artwork</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 h-full w-full">
          <Card title="Thinc. Club" href="https://www.instagram.com/thinc.in.th/" image="/assets/thinc.png">
            <ul>
              <li>ช่วยจัดทำ Artwork และวางแผนการประชาสัมพันธ์ในช่องทาง​ Social Media ของชมรม</li>
            </ul>
          </Card>
        </div> */}
      </motion.section>
    </main>
  )
}
