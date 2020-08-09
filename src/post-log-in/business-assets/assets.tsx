import {postPic, getBusPic} from '../../util/storage-func';
import {Business} from '../../util/business';
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { postBusiness } from '../../util/api-functions';
import { auth } from '../../firebase';
import './assets.css';


interface AssetsProps {
  uid: string;
  setBusiness: (b: Business) => void;
  business: Business | undefined | null;
}

const AssetsPage = ({uid, setBusiness, business} : AssetsProps) => {
  const [file, setFile] = useState<File| null>(null);
  const [images, setImages] = useState<[string, string][]>([]);
  const [progress, setProgress] = useState<number>(-1);

  useEffect(() => {
    loadImages();
  }, []);

  /**
   *
   */
  async function loadImages() {
    const imagePathList = business!.locations[0].images;
    const imageList : [string, string][] = [];
    for (let i = 0; i < imagePathList.length; i ++) {
      const path = imagePathList[i];
      await getBusPic(path, (url:string) => {
        if (url !== '') {
          imageList.push([path, url]);
        }
      });
    }
    setImages(imageList);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        postPic(file, true, undefined, setProgress, (url: string) => {
          if (url !== '') {
            if (!business!.locations[0].images.includes(file.name)) {
              business!.locations[0].images.push(file.name);
            }
            postBusiness(business!);
            setImages([...images, [file.name, url]]);
          }
        });
      }
    }
    const form = document.getElementById('form') as HTMLFormElement;
    form.reset();
  };

  const getFile = (id: string) => {
    const doc = document.getElementById(id) as HTMLInputElement;
    if (doc) {
      const files = doc.files;
      setFile(files![0]);
    }
  };

  const displayImages = () => {
    // const imageHolder = document.createElement('div');
    // imageHolder.id = 'image-holder';
    // images.forEach((img:string) => {
    //   const entry = document.createElement('img');
    //   entry.src = img;
    //   entry.alt = img;
    //   imageHolder.appendChild(entry);
    // });
    // return imageHolder;
    return (
      <div id='img-holder'>
        {
          images.map((img:[string,string], idx: number) => (
            <div id={img[0]} key={idx} className='img-info'>
              <p>{img[0]}</p>
              <img src={img[1]} alt={img[0]} key={idx} className='img-asset'/>
            </div>
          ))
        }
      </div>
    );
  };

  return (
    <div id='assets-page'>
      <h1>Your Images:</h1>
      {displayImages()}
      <Form id='form' noValidate onSubmit={submitForm}>
        <Form.Group>
          <Form.File
            name="file"
            label="File"
            onChange={ (e : any) =>getFile('imageInput')}
            // isInvalid={!!errors.file}
            // feedback={errors.file}
            id="imageInput"
            // feedbackTooltip
          />
        </Form.Group>
        <Button
          type="submit"
          variant='primary'
        >
          Post Image
        </Button>
      </Form>
      <div id='progress-bar-container'>
        {(progress >= 0) ? <ProgressBar now={progress} /> : <div/>}
      </div>
    </div>

  );
};

export default AssetsPage;
