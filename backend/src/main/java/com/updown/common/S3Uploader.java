package com.updown.common;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.updown.common.exception.ImgDeleteFailureException;
import com.updown.common.exception.ImgUploadFailureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * MultipartFile을 전달받아 InputStream으로 S3에 업로드하는 메서드
     *
     * @param multipartFile 업로드할 파일
     * @param dirName 파일이 저장될 S3 폴더 이름
     * @return 업로드된 파일의 S3 URL
     */
    public String upload(MultipartFile multipartFile, String dirName) {
        System.out.println("1번");
        System.out.println("multipartFile = " + multipartFile.getSize());
        System.out.println("multipartFile = " + multipartFile.getName());
        // 파일 이름 생성 (디렉토리 이름과 UUID를 포함한 고유한 파일 이름)
        String fileName = dirName + "/" + UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

        System.out.println("fileName = " + fileName);
        // 파일을 InputStream으로 변환하여 S3에 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            // 파일 메타데이터 설정 (파일 크기)
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(multipartFile.getSize());
            // S3에 파일 업로드 요청 생성 및 설정 (PublicRead 권한 부여)
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, fileName, inputStream, metadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

        } catch (IOException e) {
            System.out.println("에러발생..");
            throw new ImgUploadFailureException(e);
        }

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public void delete(String fileUrl) {
        String objectKeyEncoded = fileUrl.substring(fileUrl.indexOf(".com/") + 5);
        // URL 디코딩을 통해 한글 복원
        try{
            String objectKey = URLDecoder.decode(objectKeyEncoded, StandardCharsets.UTF_8);

            amazonS3Client.deleteObject(bucket, objectKey);
        }catch (Exception e){
            throw new ImgDeleteFailureException(e);
        }

    }

}