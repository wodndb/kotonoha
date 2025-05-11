# 데이터베이스 설계

단어장을 만들기 위해서 필요한 데이터 구조를 설계해야 합니다.

우선 한구어와 일본어에 한정하여 단어장을 만들 계획입니다. 사이드 프로젝트라서 타 언어를 지원하는 건 고려하지 않고 최대한 가볍게 만들 계획입니다. 또한 단어장의 목적 자체가 JLPT 공부를 위한 보조도구이므로, JLPT 공부에 필요한 단어를 저장하는 데 초점을 맞춥니다.

## 사용자 (User)

- id: 사용자 id
- email: 사용자 계정 이메일

## 사용자의 일본어 단어 (UserWords)

- id: 사용자의 일본어 단어를 구분하기 위한 ID
- userId: 사용자 ID
- wordId: 일본어 ID
- studyStatus: 사용자의 단어 공부 상태
- updatedAt: 최근 업데이트 날짜
- isFavorite: 즐겨찾기 여부

## 일본어 단어 (Word)

- id: 일본어 단어 데이터를 구분하기 위한 ID
- word: 일본어 단어
- type: 한자어, 혼합, 히라가나, 가타카나
- level: JLPT 수준
- reading: 요미가나
- partOfSpeech: 품사
- components: 단어를 구성하는 각 문자.
  - char: 문자
  - reading: 요미가나
  - type: 한자, 히라가나
- meanings: 대응되는 한국어 뜻 (여러 개)
- synonymGroupId: 유의어 그룹 ID

## 일본어 유의어 그룹 (SynonymsGroup)

- id: 유의어 그룹 ID

## 일본어 반의어 관계 (유의어 그룹 간의 관계)

- groupAId: 그룹의 ID
- groupBId: 그룹의 ID

## 한국어 뜻 (Meaning)

- id: 한국어 뜻 데이터를 구분하기 위한 ID
- meading: 한글로 구성된 한국어 뜻
- words: 대응되는 일본어 단어 (여러 개)

## 일본어 - 한국어 다대다 관계 테이블 (WordMeaning)

- wordId
- meaningId

## 예문

- id: 예문 데이터를 구분하기 위한 ID
- wordId: 예문의 대상이 되는 단어
- sentence: 예문 (일본어 문장)
- translation: 한국어 번역

## 일본어 유의어 다대다 관계 테이블

이 테이블은 관계가 중복되는 걸 방지하기 위해 단방향으로만 저장합니다. 나중에 특정 단어의 관계어를 쿼리할 때는 fromWordId와 toWordId 둘 다 조회해야 합니다.

- id: 관계를 구분하기 위한 ID
- fromWordId: 관련어
- toWordId: 관련어
- type: 종류 (유의어, 반의어, 등)

## 일본어 단어 즐겨찾기

- userId
- wordId

## 문제 오답

- type: 요미가나, 한자, 뜻, 등
- count: 틀린 횟수
