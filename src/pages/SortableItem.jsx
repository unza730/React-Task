import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { ArrowUpOutlined } from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
const SortableItem = ({ video }) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: video.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <div ref={setNodeRef} style={style}{...attributes} {...listeners}>
      <section class="text-gray-600 body-font" style={{ width: '100%' }}>
        <div class="container px-5 py-2 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4" style={{ width: '100%' }}>
            <div class="p-4 lg:w-full md:w-full">
              <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">

                <p className='text-xl mr-5' style={{ marginTop: '17px' }}>{video?.id}</p>
                <div className="flex w-1/2">
                  <span className="m-1">
                    <img src={video?.photo} width={70} style={{ borderRadius: '12%' }} />
                  </span> <span className="mt-2 ml-2 " style={{ width: '100%' }}>{video?.title}</span>
                </div>
                <div class="flex justify-around " style={{ width: '50%' }}>
                  <p style={{ marginTop: '10px' }}>{video.username}</p>
                  <div className='flex ' >
                    <p style={{ marginTop: '10px' }}>{video.like}</p>
                    <span style={{ marginTop: '6px' }}> <ArrowUpOutlined style={{ fontSize: '15px', color: 'green' }} /></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default SortableItem