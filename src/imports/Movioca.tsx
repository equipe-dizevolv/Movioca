import svgPaths from "./svg-bkrgsa8icv";

function Paragraph() {
  return (
    <div className="h-[56px] relative shrink-0 w-[208px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[56px] relative w-[208px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-white top-[-3px] w-[167px]">Sistema de Gestão Integrado Movioca</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[113px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#7c4fe0] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[113px] items-center justify-center pb-px pt-0 px-0 relative w-[256px]">
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#7c4fe0] h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center px-[16px] py-0 relative w-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p3fc7db00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2a14a800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p6d15b80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Contratação</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center px-[16px] py-0 relative w-full">
          <Icon1 />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Pagamentos</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center px-[16px] py-0 relative w-full">
          <Icon2 />
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p213cb380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2px] whitespace-pre">Documentos</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center px-[16px] py-0 relative w-full">
          <Icon3 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[204px] items-start relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[256px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pb-0 pt-[16px] px-[16px] relative rounded-[inherit] w-[256px]">
        <Container1 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[224px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[224px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-[112.25px] not-italic text-[12px] text-[rgba(255,255,255,0.7)] text-center top-[-1px] translate-x-[-50%] w-[204px]">© 2026 Sistema de Gestão Integrado Movioca. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[64px] relative shrink-0 w-[256px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#7c4fe0] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[64px] items-center justify-center pb-0 pt-px px-0 relative w-[256px]">
        <Paragraph1 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-violet-500 h-[914px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[914px] items-start relative w-[256px]">
        <Container />
        <Navigation />
        <Container2 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[400.875px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start relative w-[400.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[24px] text-nowrap text-slate-900 whitespace-pre">Sistema de Gestão Integrada</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p277f3c30} id="Vector" stroke="var(--stroke-0, #0F172A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[52px] rounded-[6px] size-[36px] top-[8px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900 whitespace-pre">Empresa ABC</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Fornecedor</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[60px] top-[8px] w-[84.328px]" data-name="Header">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[156.33px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="basis-0 bg-violet-500 grow h-[36px] min-h-px min-w-px relative rounded-[3.35544e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">EA</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] overflow-clip rounded-[3.35544e+07px] size-[36px] top-[8px]" data-name="Primitive.span">
      <Text4 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[52px] left-[104px] rounded-[3.35544e+07px] top-0 w-[184.328px]" data-name="Button">
      <Header />
      <Icon5 />
      <PrimitiveSpan />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p388cb800} id="Vector" stroke="var(--stroke-0, #0F172A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5baad20} id="Vector_2" stroke="var(--stroke-0, #0F172A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-red-500 left-[20px] rounded-[6px] size-[20px] top-[-4px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip p-px relative rounded-[inherit] size-[20px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white whitespace-pre">3</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute left-0 rounded-[6px] size-[36px] top-[8px]" data-name="Button">
      <Icon6 />
      <Badge />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[52px] relative shrink-0 w-[288.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[52px] relative w-[288.328px]">
        <Button4 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-white h-[85px] relative shrink-0 w-[1161px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[85px] items-start pb-px pt-[16px] px-[24px] relative w-[1161px]">
        <Container4 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[36px] left-0 not-italic text-[30px] text-nowrap text-slate-900 top-[-3px] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-600 top-[-2px] whitespace-pre">Resumo operacional</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[64px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph4 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 1V5" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 1V5" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p371e6400} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-1px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 2">
            <path d="M1 1H19" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-purple-100 relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[12px] px-[12px] relative size-[48px]">
        <Icon7 />
      </div>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Pagamentos</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-600 whitespace-pre">Quantidade por próxima data de pagamento</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[42px] relative shrink-0 w-[237.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[42px] items-start relative w-[237.547px]">
        <CardTitle />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="h-[48px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[48px] items-center relative w-[489.5px]">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[3px] w-[84.016px]" data-name="Text">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Próxima data:</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[24px] left-[92.02px] top-0 w-[81.469px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">30/01/2025</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[11px] w-[175.781px]" data-name="Text">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Quantidade de pagamentos:</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[183.78px] top-0 w-[25.875px]" data-name="Text">
      <p className="font-['Arial:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#9810fa] text-[24px] text-nowrap whitespace-pre">23</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[6px] w-[66.344px]" data-name="Text">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Valor total:</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[28px] left-[74.34px] top-0 w-[87.531px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-nowrap text-slate-900 top-[-1px] whitespace-pre">R$ 187.500</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function Dashboard1() {
  return (
    <div className="h-[108px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[108px] items-start relative w-[489.5px]">
        <Container8 />
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white place-self-stretch relative rounded-[12px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pb-px pl-[25px] pr-px pt-[25px] relative size-full">
          <Dashboard />
          <Dashboard1 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.44%_8.34%_12.5%_8.26%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 21">
            <path d={svgPaths.p2d23b080} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/2 right-1/2 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-25%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M1 1V5" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-1px_-9999.77%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
            <path d="M1 1H1.01" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#ffedd4] relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[12px] px-[12px] relative size-[48px]">
        <Icon8 />
      </div>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[114.75px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[114.75px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Alertas de prazo</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-red-500 h-[22px] relative rounded-[6px] shrink-0 w-[29.5px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[29.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">12</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <CardTitle1 />
      <Badge1 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Itens que exigem atenção imediata</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow h-[42px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[42px] items-start relative w-full">
        <Container12 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Dashboard2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[48px] items-center relative w-[489.5px]">
        <Container11 />
        <Container13 />
      </div>
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-[#fb2c36] left-0 rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Container" />;
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[473.5px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-slate-900">Pagamentos atrasados</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[20px] w-[473.5px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">(data vencida e status diferente de Pago)</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[6px] top-[40px] w-[53.922px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[53.922px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-900 whitespace-pre">3 itens</p>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[62px] left-[16px] top-0 w-[473.5px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
      <Badge2 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[62px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return <div className="absolute bg-[#ff6900] left-0 rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Container" />;
}

function Paragraph9() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[473.5px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-slate-900">Contratos que terminam em até 7 dias</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[6px] top-[24px] w-[53.922px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[53.922px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-900 whitespace-pre">5 itens</p>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[46px] left-[16px] top-0 w-[473.5px]" data-name="Container">
      <Paragraph9 />
      <Badge3 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-[#f0b100] left-0 rounded-[3.35544e+07px] size-[8px] top-[6px]" data-name="Container" />;
}

function Paragraph10() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[473.5px]" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-slate-900">Rubricas liberadas sem fornecedor definido</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[6px] top-[24px] w-[54.172px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[54.172px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-900 whitespace-pre">4 itens</p>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[46px] left-[16px] top-0 w-[473.5px]" data-name="Container">
      <Paragraph10 />
      <Badge4 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Dashboard3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start relative w-[489.5px]">
        <Container16 />
        <Container19 />
        <Container22 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white place-self-stretch relative rounded-[12px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <Dashboard2 />
          <Dashboard3 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%_-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 22">
            <path d="M1 1V21" id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/4 right-1/4 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
            <path d={svgPaths.p30498f48} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-green-100 relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[12px] px-[12px] relative size-[48px]">
        <Icon9 />
      </div>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Resumo de orçamento</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-600 whitespace-pre">Totais consolidados de todos os projetos ativos</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[42px] relative shrink-0 w-[250.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[42px] items-start relative w-[250.031px]">
        <CardTitle2 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Dashboard4() {
  return (
    <div className="h-[48px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[48px] items-center relative w-[489.5px]">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[63.656px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Aprovado:</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[24px] relative shrink-0 w-[89.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[89.891px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">R$ 5.000.000</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text11 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[57.016px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[57.016px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Liberado:</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[89.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[89.891px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">R$ 4.600.000</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[97.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[97.234px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Comprometido:</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[89.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[89.891px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">R$ 3.800.000</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text15 />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[62.125px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Realizado:</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[89.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[89.891px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">R$ 2.950.000</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text17 />
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[37.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[37.438px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900 whitespace-pre">Saldo:</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[28px] relative shrink-0 w-[87.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[87.531px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#00a63e] text-[18px] text-nowrap top-[-1px] whitespace-pre">R$ 850.000</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="box-border content-stretch flex h-[37px] items-center justify-between pb-0 pt-px px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Dashboard5() {
  return (
    <div className="h-[165px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[165px] items-start relative w-[489.5px]">
        <Container25 />
        <Container26 />
        <Container27 />
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:2_/_1] bg-white place-self-stretch relative rounded-[12px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pb-px pl-[25px] pr-px pt-[25px] relative size-full">
          <Dashboard4 />
          <Dashboard5 />
        </div>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[41.67%] right-[41.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-1px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
            <path d="M1 1H5" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_41.67%_12.5%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-20%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p38ff0e00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_12.5%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
            <path d={svgPaths.p398fca00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 20">
            <path d={svgPaths.p1fa5f300} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-blue-100 relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[12px] px-[12px] relative size-[48px]">
        <Icon10 />
      </div>
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Verbas por departamento</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Resumo consolidado de todos os projetos ativos</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="basis-0 grow h-[42px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[42px] items-start relative w-full">
        <CardTitle3 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 8H9.33333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 5.33333H9.33333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p35fdc80} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p91828dc} id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2af3f500} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Dashboard6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[132.891px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[132.891px]">
        <Icon11 />
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[78px] not-italic text-[14px] text-center text-nowrap text-slate-900 top-[-2px] translate-x-[-50%] whitespace-pre">Todos os Projetos</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-px relative w-full">
          <Dashboard6 />
          <Icon12 />
        </div>
      </div>
    </div>
  );
}

function Dashboard7() {
  return (
    <div className="h-[96px] relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[96px] items-start relative w-[489.5px]">
        <Container32 />
        <PrimitiveButton />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[62.563px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Solicitada:</p>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[77.797px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-slate-900 top-[-2px] w-[78px]">R$ 730.000</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[56.25px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Prestada:</p>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[77.797px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-slate-900 top-[-2px] w-[78px]">R$ 520.000</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[20px] relative shrink-0 w-[66.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[66.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Em aberto:</p>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[24px] relative shrink-0 w-[77.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[77.797px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#f54900] text-[16px] top-[-2px] w-[78px]">R$ 210.000</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text25 />
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[85.969px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Reembolsada:</p>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[69.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[69.172px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#00a63e] text-[16px] top-[-2px] w-[70px]">R$ 35.000</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container37() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[133px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[58.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900 whitespace-pre">Produção</p>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16px] relative shrink-0 w-[58.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[58.359px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-slate-600 top-[-1px] w-[59px]">R$ 250.000</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[38px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[38px] items-center justify-between px-[9px] py-px relative w-full">
          <Text29 />
          <Text30 />
        </div>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[96.391px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900 whitespace-pre">Direção de Arte</p>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[58.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[58.359px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-slate-600 top-[-1px] w-[59px]">R$ 180.000</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[38px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[38px] items-center justify-between px-[9px] py-px relative w-full">
          <Text31 />
          <Text32 />
        </div>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[63.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[20px] items-start relative w-[63.125px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-900 whitespace-pre">Fotografia</p>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[16px] relative shrink-0 w-[58.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[58.359px]">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-slate-600 top-[-1px] w-[59px]">R$ 120.000</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[38px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[38px] items-center justify-between px-[9px] py-px relative w-full">
          <Text33 />
          <Text34 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[120px] items-start pl-0 pr-[10px] py-0 relative w-full">
          <Container38 />
          <Container39 />
          <Container40 />
        </div>
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="box-border content-stretch flex h-[20px] items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-center text-slate-600">Clique em um departamento para ver detalhes</p>
    </div>
  );
}

function Dashboard8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[489.5px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start relative w-[489.5px]">
        <Container37 />
        <Container41 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:2_/_2] bg-white place-self-stretch relative rounded-[12px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <Dashboard7 />
          <Dashboard8 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_306fr)_minmax(0px,_1fr)] h-[803px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="absolute h-[16px] left-0 top-[10px] w-[137px]" data-name="CardTitle">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[16px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Atividades recentes</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[6px] top-0 w-[256px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[36px] pr-[12px] py-[4px] relative rounded-[inherit] w-[256px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-600 whitespace-pre">Buscar no painel...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute h-[36px] left-[797px] top-0 w-[256px]" data-name="Container">
      <Input />
      <Icon13 />
    </div>
  );
}

function Dashboard9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[1053px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[1053px]">
        <CardTitle4 />
        <Container43 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Contrato #C789 aprovado</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 5 min</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[75.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[75.953px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Aprovado</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container44 />
          <Text35 />
        </div>
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Pagamento #P245 em validação</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 12 min</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="bg-blue-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[79.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[79.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#193cb8] text-[12px] text-nowrap whitespace-pre">Em análise</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container46 />
          <Text36 />
        </div>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Prestação #PR-032 atrasada</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 1 hora</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="bg-[#ffe2e2] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[66.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[66.891px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#9f0712] text-[12px] text-nowrap whitespace-pre">Urgente</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container48 />
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Orçamento #002.045 atualizado</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 2 horas</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[77.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[77.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Concluído</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container50 />
          <Text38 />
        </div>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Nova solicitação #S156 criada</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 3 horas</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph22 />
        <Paragraph23 />
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="bg-[#fef9c2] h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[73.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[73.828px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#894b00] text-[12px] text-nowrap whitespace-pre">Pendente</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container52 />
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Documento #DOC-089 anexado</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 4 horas</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph24 />
        <Paragraph25 />
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[77.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[77.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Concluído</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container54 />
          <Text40 />
        </div>
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Contrato #C790 aguardando assinatura</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 5 horas</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph26 />
        <Paragraph27 />
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="bg-blue-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[79.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[79.875px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#193cb8] text-[12px] text-nowrap whitespace-pre">Em análise</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container56 />
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Carga #CR-045 processada</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 6 horas</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph28 />
        <Paragraph29 />
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[75.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[75.953px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Aprovado</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container58 />
          <Text42 />
        </div>
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Relatório mensal disponível</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 1 dia</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph30 />
        <Paragraph31 />
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[77.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[77.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Concluído</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container60 />
          <Text43 />
        </div>
      </div>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-2px] whitespace-pre">Novo usuário adicionado ao projeto</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-slate-600">Há 1 dia</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[44px] items-start relative w-full">
        <Paragraph32 />
        <Paragraph33 />
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="bg-green-100 h-[24px] relative rounded-[3.35544e+07px] shrink-0 w-[77.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[24px] items-start px-[12px] py-[4px] relative w-[77.5px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#016630] text-[12px] text-nowrap whitespace-pre">Concluído</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[70px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[70px] items-center justify-between px-[13px] py-px relative w-full">
          <Container62 />
          <Text44 />
        </div>
      </div>
    </div>
  );
}

function Dashboard10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1053px]" data-name="Dashboard">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-full items-start overflow-clip pl-0 pr-[10px] py-0 relative rounded-[inherit] w-[1053px]">
        <Container45 />
        <Container47 />
        <Container49 />
        <Container51 />
        <Container53 />
        <Container55 />
        <Container57 />
        <Container59 />
        <Container61 />
        <Container63 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[516px] relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] h-[516px] items-start pl-[25px] pr-px py-[25px] relative w-full">
          <Dashboard9 />
          <Dashboard10 />
        </div>
      </div>
    </div>
  );
}

function Dashboard11() {
  return (
    <div className="h-[1479px] relative shrink-0 w-full" data-name="Dashboard">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[1479px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container5 />
          <Container42 />
          <Card4 />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative shrink-0 w-[1161px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pl-0 pr-[10px] py-0 relative rounded-[inherit] w-[1161px]">
        <Dashboard11 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="basis-0 grow h-[914px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[914px] items-start overflow-clip relative rounded-[inherit] w-full">
        <Header1 />
        <MainContent />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="h-[914px] relative shrink-0 w-0" data-name="Section">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[914px] w-0" />
    </div>
  );
}

export default function Movioca() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Movioca">
      <Sidebar />
      <Container64 />
      <Section />
    </div>
  );
}