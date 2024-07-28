<script>
  export let data;
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
  } from '@sveltestrap/sveltestrap';
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle
  } from '@sveltestrap/sveltestrap';
  const {info} = data;
  console.log(info)
</script>
<div class="bg-slate-100 flex flex-col justify-center items-center h-[90vh]" >
  
<Card color='light' class='shadow-2xl  w-[80%]' >
  <CardHeader>
    <CardTitle>{info.name}</CardTitle>
  </CardHeader>
  <CardBody>
    <CardSubtitle>Paymail : {info.paymail}</CardSubtitle>
    <CardText>{info.organization}</CardText>
    <CardText><b>Mission Statement:</b> {info.mission}</CardText>
    
    <CardText><b>Finance Statement:</b> {info.financialInfo}</CardText>

    

<CardText><b>Project:</b> {info.projects
  }</CardText>
   
    <CardText> <b>Email:</b> {info.email}</CardText>
   

    <div class="flex flex-row mt-4 border-t-[1px] pt-2  border-black justify-between" >
      <Dropdown class='' >
        <DropdownToggle caret>Select Payment Method</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>Credit Card</DropdownItem>
          <DropdownItem>Blockchain</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button href='/charity/donate' color='success' size='md' >Donate</Button>
    </div>
  </CardBody>
  <CardFooter>Created: {info.updatedAt.substring(0,10)}</CardFooter>
</Card>
</div>