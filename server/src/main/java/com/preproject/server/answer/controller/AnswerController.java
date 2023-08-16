package com.preproject.server.answer.controller;

import com.preproject.server.answer.dto.*;
import com.preproject.server.answer.entity.Answer;
import com.preproject.server.answer.mapper.AnswerMapper;
import com.preproject.server.answer.service.AnswerService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

/**
 * question, member 클래스가 아직 없으므로 작성할 답변을 memberId와 questionId를 통해서 조회해하는 부분은 주석처리하고
 * -> 답변 등록할 걸 통해서 질문에 답변id가 부여되므로 질문을 확인하는건 필요없는 부분일듯함!
 * 답변 crud만 작성해서 테스트해보기!
 */

@RestController
@RequestMapping("/question/{question-id}/answer")
@Validated
public class AnswerController {

    private final AnswerService answerService;

    private final AnswerMapper answerMapper;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
    }

    // 답변 등록
    @PostMapping()
    public ResponseEntity postAnswer(@Positive @PathVariable("question-id") long questionId,
                                     @Valid @RequestBody AnswerPostDto answerPostDto) {

        // answerPostDto를 Answer 엔티티로 변환
        Answer answer = answerMapper.answerPostDtoToanswer(answerPostDto);

        // AnswerService를 사용하여 답변을 등록하고 등록된 답변을 반환
        Answer response = answerService.createAnswer(answer, questionId);

        // 생성된 답변을 DTO로 변환하여 ResponseEntity로 감싸서 반환
        return new ResponseEntity<>(answerMapper.answerToAnswerResponseDto(response), HttpStatus.CREATED);

    }

    // 답변 수정 (답변 id를 통해서 조회 후 수정)
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("question-id") long questionId,
                                      @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto) {

        // 수정할 답변 찾기
        Answer updateAnswer = answerService.findAnswerById(answerId);


        // 답변할 질문 찾기
        if (updateAnswer.getQuestion().getQuestionId() != questionId) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("답변하려는 질문이 없습니다.");
        }


        // 답변 내용 업데이트 할 때 null 값인지 여부 확인
        if (answerPatchDto.getContent() != null) {
            updateAnswer.setContent(answerPatchDto.getContent());
        }

        // 수정한 답변의 내용을 response에 저장
        Answer response = answerService.updateAnswer(updateAnswer);

        return new ResponseEntity<>(answerMapper.answerToAnswerResponseDto(response), HttpStatus.OK);


    }

    // 답변 조회 ( 질문과 함께 조회가 되어야 함 )
    // 답변이 등록된걸로 고유의 답변id가 부여됐을테니 질문번호를 찾지 않고 로직 구현 -> 질문 번호 별 답변을 찾는 걸로 수정
    // 답변이 한 페이지에 여러 개의 답변이 구현되려면 페이지네이션을 적용하면 될듯함!
    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("question-id") long questionId,
                                    @PathVariable("answer-id") long answerId) {

        // 조회할 답변 찾기
        Answer findAnswer = answerService.findAnswerById(answerId);


        // 답변할 질문 찾기
        if (findAnswer.getQuestion().getQuestionId() != questionId) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("조회하려는 질문이 없습니다.");
        }


        Answer response = answerService.findAnswer(answerId);

        // 응답
        return new ResponseEntity<>(answerMapper.answerToAnswerResponseDto(response), HttpStatus.OK);

    }

    // 페이지네이션을 적용하여 조회(질문 번호당)
    @GetMapping()
    public ResponseEntity getAnswers(@PathVariable("question-id") long questionId,
                                     @Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        // questionId를 통해 질문 번호를 조회
        // 페이지는 1부터 시작인데 데이터 액세스 계층에서 접근은 0부터라 page에서 -1
        Page<Answer> answerPage = answerService.findAnswers(page - 1, size, questionId);
        PageInfo pageInfo = new PageInfo(page, size, (int) answerPage.getTotalElements(), answerPage.getTotalPages());

        List<Answer> answers = answerPage.getContent();
        List<AnswerResponseDto> response = answerMapper.answerToAnswerResponseDtos(answers);

        return new ResponseEntity<>(new AnswerPageDto(response, pageInfo), HttpStatus.OK);

    }


    // 답변 삭제 (질문id에서 먼저 조회 후 답변 id를 통해서 삭제)
    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") long questionId,
                                       @PathVariable("answer-id") long answerId) {

        // 삭제할 답변 조회
        Answer deleteAnswer1 = answerService.findAnswer(answerId);

        // 삭제할 질문 찾기
        if(deleteAnswer1.getQuestion().getQuestionId() != questionId) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("삭제할 답변이 없습니다.");
        }

        // 답변 삭제
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}

