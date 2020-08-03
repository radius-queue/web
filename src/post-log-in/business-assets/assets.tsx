import {postPic} from '../../util/storage-func';
import {Business} from '../../util/business';
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';


interface AssetsProps {
  uid: string;
  setBusiness: (b: Business) => void;
  business: Business | undefined | null;
}

const AssetsPage = ({uid, setBusiness, business} : AssetsProps) => {
  const [file, setFile] = useState<File| null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // const images = document.createElement('div');
    // images.id = 'image-holder';

    const imageUrlList = business?.locations[0].images;

  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      postPic(file, true, undefined, console.log);
    }
  };

  const getFile = (id: string) => {
    const doc = document.getElementById(id) as HTMLInputElement;
    if (doc) {
      const files = doc.files;
      setFile(files![0]);
    }
  };

  return (
    <Form noValidate onSubmit={submitForm}>
      <Form.Group>
        <Form.File
          name="file"
          label="File"
          onChange={ (e : any) =>getFile('validationFormik107')}
          // isInvalid={!!errors.file}
          // feedback={errors.file}
          id="validationFormik107"
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
  );
};

export default AssetsPage;
