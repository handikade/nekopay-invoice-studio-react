import styled from "@emotion/styled";
import type { DeepPartial } from "react-hook-form";
import type { Invoice } from "../../schema";

const Container = styled.div`
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  font-family: "Merriweather", "Georgia", serif;
  color: #0f172a;
  min-height: 1200px;
`;

const SectionDivider = styled.hr`
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 16px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MetaStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 220px;
`;

const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.02em;
`;

const Text = styled.span`
  display: block;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const MutedText = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #64748b;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const SectionTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.02em;
`;

const StrongText = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 600;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const InvoiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const TableHeadRow = styled.tr`
  background-color: #e2e8f0;
`;

type Align = "left" | "right" | "center";

const TableHeaderCell = styled.th<{ align?: Align }>`
  padding: 10px 12px;
  text-align: ${({ align }) => align ?? "left"};
  font-weight: 600;
  color: #0f172a;
  border-bottom: 1px solid #cbd5e1;
`;

const TableCell = styled.td<{ align?: Align }>`
  padding: 10px 12px;
  text-align: ${({ align }) => align ?? "left"};
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
`;

const TotalsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const TotalsBox = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TotalsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const TotalLabel = styled.span`
  font-size: 0.9rem;
  color: #64748b;
`;

const TotalValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

const BodyText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const SignatureLine = styled.div`
  height: 64px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #94a3b8;
`;

const SignatureImage = styled.img`
  max-height: 56px;
  max-width: 100%;
  object-fit: contain;
`;

const SignaturePlaceholder = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
`;

type InvoiceTemplateDefaultProps = {
  invoice: DeepPartial<Invoice>;
};

const formatText = (value?: string) => {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "--";
};

const formatDate = (value: unknown) => {
  if (!value) {
    return "--";
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
  }

  if (typeof (value as { format?: unknown }).format === "function") {
    return (value as { format: (format: string) => string }).format(
      "MMM DD, YYYY",
    );
  }

  return "--";
};

const formatCurrency = (value: number, currency?: string) => {
  const amount = Number.isFinite(value) ? value : 0;
  if (currency) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  return amount.toFixed(2);
};

const getAmount = (value: unknown) =>
  Number.isFinite(Number(value)) ? Number(value) : 0;

const InvoiceTemplateDefault = ({ invoice }: InvoiceTemplateDefaultProps) => {
  const items = invoice?.items ?? [];
  const currency = invoice?.currency ?? "";
  const subtotal = items.reduce((sum, item) => {
    const quantity = getAmount(item?.quantity);
    const price = getAmount(item?.price);
    return sum + quantity * price;
  }, 0);
  const total = subtotal;
  const footer = invoice?.footer;
  const signatureHeader =
    footer?.signatureTextHeader?.trim() || "Authorized Signature";
  const signatureFooter = footer?.signatureTextFooter?.trim() || "--";

  return (
    <Container>
      <Header>
        <Stack>
          <Title>Invoice</Title>
          <MutedText>
            Invoice No: {formatText(invoice?.invoiceNumber)}
          </MutedText>
        </Stack>
        <MetaStack>
          <Stack>
            <Label>Issue Date</Label>
            <Text>{formatDate(invoice?.issueDate)}</Text>
          </Stack>
          <Stack>
            <Label>Due Date</Label>
            <Text>{formatDate(invoice?.dueDate)}</Text>
          </Stack>
        </MetaStack>
      </Header>

      <SectionDivider />

      <SectionGrid>
        <Stack>
          <SectionTitle>From</SectionTitle>
          <StrongText>{formatText(invoice?.from?.name)}</StrongText>
          <Text>{formatText(invoice?.from?.address)}</Text>
          <Text>Phone: {formatText(invoice?.from?.phone)}</Text>
          <Text>Email: {formatText(invoice?.from?.email)}</Text>
        </Stack>
        <Stack>
          <SectionTitle>Bill To</SectionTitle>
          <StrongText>{formatText(invoice?.to?.name)}</StrongText>
          <Text>{formatText(invoice?.to?.address)}</Text>
          <Text>Phone: {formatText(invoice?.to?.phone)}</Text>
          <Text>Email: {formatText(invoice?.to?.email)}</Text>
        </Stack>
      </SectionGrid>

      <SectionDivider />

      <TableWrapper>
        <InvoiceTable>
          <thead>
            <TableHeadRow>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell align="right">Qty</TableHeaderCell>
              <TableHeaderCell align="right">Unit Price</TableHeaderCell>
              <TableHeaderCell align="right">Amount</TableHeaderCell>
            </TableHeadRow>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <TableCell colSpan={4}>
                  <MutedText>No items yet.</MutedText>
                </TableCell>
              </tr>
            ) : (
              items.map((item, index) => {
                const quantity = getAmount(item?.quantity);
                const price = getAmount(item?.price);
                const lineTotal = quantity * price;

                return (
                  <tr key={item?.id ?? `${index}-row`}>
                    <TableCell>{formatText(item?.description)}</TableCell>
                    <TableCell align="right">
                      {Number.isFinite(quantity) ? quantity : 0}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(price, currency)}
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(lineTotal, currency)}
                    </TableCell>
                  </tr>
                );
              })
            )}
          </tbody>
        </InvoiceTable>
      </TableWrapper>

      <TotalsWrapper>
        <TotalsBox>
          <TotalsRow>
            <TotalLabel>Subtotal</TotalLabel>
            <Text>{formatCurrency(subtotal, currency)}</Text>
          </TotalsRow>
          <TotalsRow>
            <TotalValue>Total Due</TotalValue>
            <TotalValue>{formatCurrency(total, currency)}</TotalValue>
          </TotalsRow>
        </TotalsBox>
      </TotalsWrapper>

      <SectionDivider />

      <SectionGrid>
        <Stack>
          <SectionTitle>Terms</SectionTitle>
          <BodyText>{formatText(footer?.terms)}</BodyText>
          <SectionTitle>Notes</SectionTitle>
          <BodyText>{formatText(footer?.notes)}</BodyText>
        </Stack>
        <Stack>
          <SectionTitle>{signatureHeader}</SectionTitle>
          <SignatureLine>
            {footer?.signatureURL ? (
              <SignatureImage src={footer.signatureURL} alt="Signature" />
            ) : (
              <SignaturePlaceholder>Signature</SignaturePlaceholder>
            )}
          </SignatureLine>
          <Text>{signatureFooter}</Text>
        </Stack>
      </SectionGrid>
    </Container>
  );
};

export default InvoiceTemplateDefault;
